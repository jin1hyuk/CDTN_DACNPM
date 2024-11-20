using DigiForum_BE.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Threading.Tasks;

namespace DigiForum_BE.Controllers
{
    [ApiController]
    [Route("api/User")]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _ctx;

        public UserController(AppDbContext dbContext)
        {
            _ctx = dbContext;
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _ctx.Users.ToListAsync();
            return Ok(users);
        }

        [HttpGet("token")]
        [Authorize(Roles = "Admin,User")]
        public async Task<IActionResult> GetUserByToken()
        {
            var userId = User.FindFirstValue("user_id"); 

            var user = await _ctx.Users.SingleOrDefaultAsync(u => u.Id.ToString() == userId);

            if (user == null)
            {
                return NotFound("Không tìm thấy user.");
            }

            return Ok(user);
        }

        public class UpdateUserStatusRequest
        {
            public Guid Id { get; set; }
            public bool IsActive { get; set; }
        }

        [HttpPut("update-status")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateUserStatus([FromBody] UpdateUserStatusRequest request)
        {
            var user = await _ctx.Users.FindAsync(request.Id);

            if (user == null)
            {
                return NotFound("Không tìm thấy người dùng.");
            }

            user.IsActive = request.IsActive;

            await _ctx.SaveChangesAsync();

            return Ok("Cập nhật trạng thái thành công.");
        }

        [HttpPut("update-user")]
        [Authorize(Roles = "Admin,User")]
        public async Task<IActionResult> UpdateUserByToken([FromBody] User updatedUser)
        {
            // Lấy user_id từ claims trong token
            var userId = User.FindFirstValue("user_id");

            if (userId == null)
            {
                return Unauthorized("Không có thông tin người dùng trong token.");
            }

            var user = await _ctx.Users.SingleOrDefaultAsync(u => u.Id.ToString() == userId);

            user.Username = updatedUser.Username ?? user.Username;
            user.Email = updatedUser.Email ?? user.Email;
            user.FullName = updatedUser.FullName ?? user.FullName;
            user.Date = updatedUser.Date ?? user.Date;
            user.PhoneNumber = updatedUser.PhoneNumber ?? user.PhoneNumber;
            user.Address = updatedUser.Address ?? user.Address;
            user.Password = updatedUser.Password ?? user.Password;
            user.ProfilePictureUrl = updatedUser.ProfilePictureUrl ?? user.ProfilePictureUrl;

            user.UpdatedAt = DateTime.UtcNow;

            await _ctx.SaveChangesAsync();

            return Ok("Cập nhật thông tin người dùng thành công.");
        }

        [HttpDelete("delete-user")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteUser([FromBody] Guid id)
        {
            var user = await _ctx.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound("Không tìm thấy user.");
            }

            _ctx.Users.Remove(user);
            await _ctx.SaveChangesAsync();
            return Ok("Xóa user thành công.");
        }

    }
}
