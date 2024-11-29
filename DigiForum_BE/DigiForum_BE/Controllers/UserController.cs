using DigiForum_BE.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;
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

        [HttpGet("personal/get-infor")]
        [Authorize(Roles = "Admin,User")]
        public async Task<IActionResult> GetPersonalInformationByToken()
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

        [HttpPut("personal/update-infor")]
        [Authorize(Roles = "Admin,User")]
        public async Task<IActionResult> GetPersonalInformationByToken([FromBody] User updatedUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Thông tin nhập vào không đúng định dạng.");
            }

            var userId = User.FindFirstValue("user_id");

            if (userId == null)
            {
                return Unauthorized("Không có thông tin người dùng trong token.");
            }

            var user = await _ctx.Users.SingleOrDefaultAsync(u => u.Id.ToString() == userId);

            if (user == null)
            {
                return NotFound("Người dùng không tồn tại.");
            }

            if (!string.IsNullOrEmpty(updatedUser.Email) && updatedUser.Email != user.Email)
            {
                var emailExists = await _ctx.Users.AnyAsync(u => u.Email == updatedUser.Email);
                if (emailExists)
                {
                    return BadRequest("Email này đã được sử dụng bởi tài khoản khác.");
                }
            }

            user.Username = updatedUser.Username ?? user.Username;
            user.Email = updatedUser.Email ?? user.Email;
            user.FullName = updatedUser.FullName ?? user.FullName;
            user.Birthdate = updatedUser.Birthdate ?? user.Birthdate;
            user.PhoneNumber = updatedUser.PhoneNumber ?? user.PhoneNumber;
            user.Address = updatedUser.Address ?? user.Address;
            user.Avatar = updatedUser.Avatar ?? user.Avatar;

            user.UpdatedAt = DateTime.UtcNow;

            try
            {
                await _ctx.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi khi cập nhật thông tin: {ex.Message}");
            }

            return Ok("Cập nhật thông tin người dùng thành công.");
        }

        public class ChangePasswordRequest
        {
            public string OldPassword { get; set; }
            public string NewPassword { get; set; }
            public string ConfirmNewPassword { get; set; }
        }

        [HttpPut("personal/change-password")]
        [Authorize(Roles = "Admin,User")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequest request)
        {
            var userId = User.FindFirstValue("user_id");

            if (userId == null)
            {
                return Unauthorized("Không có thông tin người dùng trong token.");
            }

            var user = await _ctx.Users.SingleOrDefaultAsync(u => u.Id.ToString() == userId);

            if (user == null)
            {
                return NotFound("Người dùng không tồn tại.");
            }

            if (user.Password != request.OldPassword)
            {
                return BadRequest("Mật khẩu cũ không đúng.");
            }

            if (request.NewPassword == request.OldPassword)
            {
                return BadRequest("Mật khẩu mới không được giống mật khẩu cũ.");
            }

            if (request.NewPassword != request.ConfirmNewPassword)
            {
                return BadRequest("Mật khẩu mới và xác minh mật khẩu mới không khớp.");
            }

            user.Password = request.NewPassword;  

            user.UpdatedAt = DateTime.UtcNow;

            try
            {
                await _ctx.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi khi thay đổi mật khẩu: {ex.Message}");
            }

            return Ok("Đổi mật khẩu thành công.");
        }



        [HttpPut("update-role")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateUserRole([FromBody] User user)
        {
            var validRoles = Enum.GetValues(typeof(Role)).Cast<Role>().ToList();
            if (user.Roles == null || !validRoles.Contains(user.Roles.Value))
            {
                return BadRequest("Role không hợp lệ.");
            }

            var existingUser = await _ctx.Users.FindAsync(user.Id);
            if (existingUser == null)
            {
                return NotFound("User không tồn tại.");
            }

            existingUser.Roles = user.Roles;

            existingUser.UpdatedAt = DateTime.UtcNow;

            await _ctx.SaveChangesAsync();

            return Ok("Cập nhật role thành công.");
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
