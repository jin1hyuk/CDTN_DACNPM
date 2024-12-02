using DigiForum_BE.Models;
using DigiForum_BE.Models.DTOs.Auth;
using DigiForum_BE.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DigiForum_BE.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class AuthController : Controller
    {
        private readonly AuthService _auths;
        private readonly EmailService _emails;
        private readonly UserService _users;
        private readonly PasswordService _passwords;
        public AuthController(AuthService authService, EmailService emailService, UserService userService, PasswordService passwords)
        {
            _auths = authService;
            _emails = emailService ?? throw new ArgumentNullException(nameof(emailService));
            _users = userService;
            _passwords = passwords;
        }

        [HttpPost("signup")]
        [AllowAnonymous]
        public async Task<IActionResult> Signup([FromBody] SignupRequest signupRequest)
        {
            if (await _users.IsEmailExist(signupRequest.Email))
            {
                return BadRequest("Email đã tồn tại.");
            }
            await _users.CreateUser(signupRequest);
            return Ok("Tạo người dùng thành công");
        }

        [HttpPost("signin")]
        [AllowAnonymous]
        public IActionResult Signin([FromBody] SigninRequest request)
        {
            try
            {
                var token = _users.Authenticate(request.Email, request.Password);
                return Ok(new { token });
            }
            catch (Exception ex)
            {
                return Unauthorized(ex.Message);
            }
        }

        [HttpPost("forgot-password")]
        [AllowAnonymous]
        public async Task<IActionResult> ForgotPassword([FromBody] string email)
        {
            try
            {
                var code = await _passwords.GenerateVerificationCode(email);
                await _emails.SendEmailAsync(email, "Mã xác minh", $"Mã xác minh của bạn là: {code}");
                return Ok("Mã xác minh đã được gửi.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("reset-password")]
        [AllowAnonymous]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequest request)
        {
            try
            {
                await _users.ResetPassword(request.Email, request.VerificationCode, request.NewPassword);
                return Ok("Mật khẩu đã được đặt lại thành công.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
