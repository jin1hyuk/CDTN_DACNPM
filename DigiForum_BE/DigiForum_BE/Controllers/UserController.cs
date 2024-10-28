using DigiForum_BE.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _ctx.Users.ToListAsync();
            return Ok(users);
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "admin,user")]
        public async Task<IActionResult> GetUserById(Guid id)
        {
            var user = await _ctx.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound("Không tìm thấy user.");
            }

            if (User.IsInRole("user") && user.Id != id)
            {
                return Forbid("Bạn không có quyền xem thông tin người dùng khác.");
            }

            return Ok(user);
        }


        [HttpDelete("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> DeleteUser(Guid id)
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

        [HttpPut("{id}")]
        [Authorize(Roles = "admin,user")]
        public async Task<IActionResult> UpdateUser(Guid id, User updatedUser)
        {
            var user = await _ctx.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound("Không tìm thấy user.");
            }

            if (User.IsInRole("user") && user.Id != id)
            {
                return Forbid("Bạn không có quyền cập nhật thông tin người dùng khác.");
            }

            user.Name = updatedUser.Name;
            user.Email = updatedUser.Email;
            user.Password = updatedUser.Password;

            await _ctx.SaveChangesAsync();
            return Ok("Cập nhật user thành công.");
        }
    }
}
