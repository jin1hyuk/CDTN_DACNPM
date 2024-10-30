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

        public AuthController(AppDbContext dbContext, AuthService authService)
        {
            _ctx = dbContext;
            _authService = authService;
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

        [HttpPost("forgot-password")]
        [AllowAnonymous]
        public async Task<IActionResult> ForgotPassword([FromBody] string email)
        {
            var user = await _ctx.Users.SingleOrDefaultAsync(u => u.Email == email);

            if (user == null)
            {
                return BadRequest("Email không tồn tại trong hệ thống.");
            }
            var token = _authService.GeneratePasswordResetToken(user);

            var resetLink = Url.Action("ResetPassword", "Auth", new { token, email = user.Email }, Request.Scheme);

            await _emailService.SendEmailAsync(user.Email, "Đặt lại mật khẩu", $"Bấm vào đây để đặt lại mật khẩu: {resetLink}");

            return Ok("Email đặt lại mật khẩu đã được gửi.");
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword(string token, string email, string newPassword)
        {
            var user = await _ctx.Users.SingleOrDefaultAsync(u => u.Email == email);

            if (user == null)
            {
                return BadRequest("Yêu cầu không hợp lệ.");
            }

            var isValidToken = _authService.ValidatePasswordResetToken(token, email);

            if (!isValidToken)
            {
                return Unauthorized("Token không hợp lệ hoặc đã hết hạn.");
            }

            user.Password = newPassword;
            await _ctx.SaveChangesAsync();

            return Ok("Mật khẩu đã được đặt lại thành công.");
        }


    }
}
