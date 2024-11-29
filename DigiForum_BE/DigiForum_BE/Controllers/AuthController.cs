﻿using DigiForum_BE.Models;
using DigiForum_BE.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DigiForum_BE.Controllers
{
    [ApiController]
    [Route("Auth")]
    public class AuthController : Controller
    {
        private readonly AppDbContext _ctx;
        private readonly AuthService _authService;
        private readonly EmailService _emailService;
        private static readonly Dictionary<string, (int FailedAttempts, DateTime LockoutEnd)> LoginAttempts = new();

        public AuthController(AppDbContext dbContext, AuthService authService, EmailService emailService)
        {
            _ctx = dbContext;
            _authService = authService;
            _emailService = emailService ?? throw new ArgumentNullException(nameof(emailService));
        }

        [HttpPost("signup")]
        [AllowAnonymous]
        public async Task<IActionResult> Signup([FromBody] User user)
        {
            if (await _ctx.Users.AnyAsync(u => u.Email == user.Email))
            {
                return BadRequest("Email đã tồn tại.");
            }

            user.Roles = Role.User;

            await _ctx.Users.AddAsync(user);
            await _ctx.SaveChangesAsync();

            var token = _authService.GenerateToken(user);
            return Ok(token);
        }

        public class SigninRequest
        {
            public string? Email { get; set; }
            public string? Password { get; set; }
        }


        [HttpPost("signin")]
        [AllowAnonymous]
        public IActionResult Signin([FromBody] SigninRequest request)
        {
            var clientIp = HttpContext.Connection.RemoteIpAddress?.ToString();

            if (LoginAttempts.ContainsKey(clientIp))
            {
                var (failedAttempts, lockoutEnd) = LoginAttempts[clientIp];

                if (DateTime.UtcNow < lockoutEnd)
                {
                    return BadRequest($"Bạn đã nhập sai quá nhiều lần. Vui lòng thử lại sau {lockoutEnd.Subtract(DateTime.UtcNow).Seconds} giây.");
                }
            }

            var user = _ctx.Users.SingleOrDefault(u => u.Email == request.Email);

            if (user == null || user.Password != request.Password)
            {
                if (!LoginAttempts.ContainsKey(clientIp))
                {
                    LoginAttempts[clientIp] = (1, DateTime.UtcNow);
                }
                else
                {
                    var (failedAttempts, _) = LoginAttempts[clientIp];
                    failedAttempts++;

                    if (failedAttempts >= 5)
                    {
                        LoginAttempts[clientIp] = (failedAttempts, DateTime.UtcNow.AddSeconds(30));
                        return BadRequest($"Bạn đã nhập sai {failedAttempts} lần. Vui lòng thử lại sau 30 giây.");
                    }

                    LoginAttempts[clientIp] = (failedAttempts, DateTime.UtcNow);
                }

                return Unauthorized("Sai email hoặc mật khẩu.");
            }

            if (LoginAttempts.ContainsKey(clientIp))
            {
                LoginAttempts.Remove(clientIp);
            }

            var token = _authService.GenerateToken(user);
            return Ok(new { token });
        }


        [HttpPost("forgot-password")]
        [AllowAnonymous]
        public async Task<IActionResult> ForgotPassword([FromBody] string email)
        {
            var user = await _ctx.Users.SingleOrDefaultAsync(u => u.Email == email);

            if (user == null)
            {
                return BadRequest("Email không tồn tại.");
            }
            string verificationCode = GenerateRandomCode(6);
            user.VerificationCode = verificationCode;
            user.VerificationCodeExpiration = DateTime.Now.AddMinutes(15);
            if (user.Email == null)
            {
                return BadRequest("Email không được để trống.");
            }

            try
            {
                await _emailService.SendEmailAsync(user.Email, "Mã xác nhận đặt lại mật khẩu",
                    $"Mã xác nhận của bạn là: {verificationCode}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error sending email: {ex.Message}");

                return StatusCode(500, "Đã có lỗi xảy ra khi gửi email. Vui lòng thử lại sau.");
            }


            await _ctx.SaveChangesAsync();

            return Ok("Mã xác minh gửi đến email thành công.");
        }

        public class ResetPasswordRequest
        {
            public string? VerificationCode { get; set; }
            public string? Email { get; set; }
            public string? NewPassword { get; set; }
        }


        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequest request)
        {
            if (request == null)
            {
                return BadRequest("Dữ liệu yêu cầu không hợp lệ.");
            }

            var user = await _ctx.Users.SingleOrDefaultAsync(u => u.Email == request.Email);

            if (user == null)
            {
                return BadRequest("Yêu cầu không hợp lệ.");
            }

            if (user.VerificationCode != request.VerificationCode)
            {
                return Unauthorized("Mã xác minh chưa đúng. Vui lòng nhập lại.");
            }

            if (user.VerificationCodeExpiration < DateTime.Now)
            {
                return Unauthorized("Mã xác nhận đã hết hạn.");
            }

            user.Password = request.NewPassword;
            user.VerificationCode = null;
            user.VerificationCodeExpiration = null;

            await _ctx.SaveChangesAsync();

            return Ok("Mật khẩu đã được đặt lại thành công.");
        }

        private string GenerateRandomCode(int length)
        {
            var random = new Random();
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }
    }
}
