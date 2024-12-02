using DigiForum_BE.Models.DTOs.User;
using DigiForum_BE.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;
using System.Threading.Tasks;

namespace DigiForum_BE.Controllers
{
    [ApiController]
    [Route("api/User")]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }

        [HttpGet("admin/get-all-infor")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userService.GetAllUsers();
            return Ok(users);
        }

        [HttpGet("personal/get-infor")]
        [Authorize(Roles = "Admin,User")]
        public async Task<IActionResult> GetPersonalInformationByToken()
        {
            var user = await _userService.GetUserByToken(User);

            if (user == null)
                return NotFound("Không tìm thấy user.");

            return Ok(user);
        }

        [HttpPut("admin/update-status-user")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateUserStatus([FromBody] UpdateUserStatusRequest request)
        {
            await _userService.UpdateUserStatus(request);
            return Ok("Cập nhật trạng thái thành công.");
        }

        [HttpPut("personal/update-infor")]
        [Authorize(Roles = "Admin,User")]
        public async Task<IActionResult> UpdatePersonalInformation([FromBody] UpdateUserInfoRequest request)
        {
            var userId = User.FindFirstValue("user_id");
            if (userId == null) return Unauthorized("Không có thông tin người dùng trong token.");

            await _userService.UpdateUserInformation(Guid.Parse(userId), request);
            return Ok("Cập nhật thông tin thành công.");
        }

        [HttpPut("personal/change-password")]
        [Authorize(Roles = "Admin,User")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequest request)
        {
            var userId = User.FindFirstValue("user_id");
            if (userId == null) return Unauthorized("Không có thông tin người dùng trong token.");

            await _userService.ChangePassword(Guid.Parse(userId), request);
            return Ok("Đổi mật khẩu thành công.");
        }

        [HttpPut("admin/update-role-user")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateUserRole([FromBody] UpdateUserRoleRequest request)
        {
            await _userService.UpdateUserRole(request);
            return Ok("Cập nhật role thành công.");
        }

        [HttpDelete("admin/delete-user")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteUser([FromBody] Guid id)
        {
            await _userService.DeleteUser(id);
            return Ok("Xóa user thành công.");
        }
    }
}
