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
        public async Task<IActionResult> Signup([FromBody] User user)
        {
            if (await _ctx.Users.AnyAsync(u => u.Email == user.Email))
            {
                return BadRequest("Email đã tồn tại.");
            }

            if (await _ctx.Users.AnyAsync(u => u.Username == user.Username))
            {
                return BadRequest("Username đã tồn tại.");
            }

            user.Roles = Role.User;

            await _ctx.Users.AddAsync(user);
            await _ctx.SaveChangesAsync();

            var token = _authService.GenerateToken(user);
            return Ok(token);
        }

        public class SigninRequest
        {
            public string? Username { get; set; }
            public string? Password { get; set; }
        }


        [HttpPost("signin")]
        [AllowAnonymous]
        public async Task<IActionResult> Signin([FromBody] SigninRequest request)
        {
            // Tìm người dùng bằng Username thay vì Email
            var user = await _ctx.Users.SingleOrDefaultAsync(u => u.Username == request.Username);

            // Kiểm tra nếu không tìm thấy người dùng hoặc mật khẩu không đúng
            if (user == null || user.Password != request.Password)
            {
                return Unauthorized("Username hoặc mật khẩu không chính xác.");
            }

            // Tạo và trả về token cho người dùng
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
            string verificationCode = GenerateRandomCode(6);
            user.VerificationCode = verificationCode;
            user.VerificationCodeExpiration = DateTime.Now.AddMinutes(15);
            if (user.Email == null)
            {
                return BadRequest("Email không được để trống.");
            }

            await _emailService.SendEmailAsync(user.Email, "Mã xác nhận đặt lại mật khẩu",
                $"Mã xác nhận của bạn là: {verificationCode}");


            await _ctx.SaveChangesAsync();

            return Ok("Mã xác nhận đã được gửi đến email của bạn.");
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
            // Kiểm tra nếu đối tượng request null
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
                return Unauthorized("Mã xác nhận không hợp lệ.");
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
