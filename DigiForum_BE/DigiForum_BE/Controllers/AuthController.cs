using DigiForum_BE.Models;
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

        public AuthController(AppDbContext dbContext, AuthService authService, EmailService emailService)
        {
            _ctx = dbContext;
            _authService = authService;
            _emailService = emailService ?? throw new ArgumentNullException(nameof(emailService));
        }

        [HttpPost("signup")]
        [AllowAnonymous]
        public async Task<IActionResult> Signup(User user)
        {
            if (await _ctx.Users.AnyAsync(u => u.Email == user.Email))
            {
                return BadRequest("Email đã tồn tại.");
            }


            await _ctx.Users.AddAsync(user);
            await _ctx.SaveChangesAsync();

            var token = _authService.GenerateToken(user);
            return Ok(token);
        }

        [HttpPost("signin")]
        [AllowAnonymous]
        public async Task<IActionResult> Signin(string email, string password)
        {
            var user = await _ctx.Users.SingleOrDefaultAsync(u => u.Email == email);

            if (user == null || user.Password != password)
            {
                return Unauthorized("Email hoặc mật khẩu không chính xác.");
            }

            var token = _authService.GenerateToken(user);
            return Ok(new { token });
        }
        private static string _currentVerificationCode; // Biến tĩnh để lưu mã xác nhận hiện tại

        [HttpPost("forgot-password")]
        [AllowAnonymous]
        public async Task<IActionResult> ForgotPassword([FromBody] string email)
        {
            var user = await _ctx.Users.SingleOrDefaultAsync(u => u.Email == email);

            if (user == null)
            {
                return BadRequest("Email không tồn tại trong hệ thống.");
            }

            // Tạo mã xác nhận ngẫu nhiên
            _currentVerificationCode = GenerateRandomCode(6);

            // Gửi mã xác nhận qua email
            await _emailService.SendEmailAsync(user.Email, "Mã xác nhận đặt lại mật khẩu",
                $"Mã xác nhận của bạn là: {_currentVerificationCode}");

            return Ok("Mã xác nhận đã được gửi đến email của bạn.");
        }

        // Phương thức tạo mã xác nhận ngẫu nhiên
        private string GenerateRandomCode(int length)
        {
            var random = new Random();
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword(string verificationCode, string email, string newPassword)
        {
            var user = await _ctx.Users.SingleOrDefaultAsync(u => u.Email == email);

            if (user == null)
            {
                return BadRequest("Yêu cầu không hợp lệ.");
            }

            // Kiểm tra mã xác nhận
            if (_currentVerificationCode != verificationCode)
            {
                return Unauthorized("Mã xác nhận không hợp lệ.");
            }

            // Cập nhật mật khẩu
            user.Password = newPassword;
            await _ctx.SaveChangesAsync();

            // Đặt lại mã xác nhận sau khi đặt lại mật khẩu thành công
            _currentVerificationCode = null; // Reset mã xác nhận

            return Ok("Mật khẩu đã được đặt lại thành công.");
        }
    }
}
