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
    }
}
