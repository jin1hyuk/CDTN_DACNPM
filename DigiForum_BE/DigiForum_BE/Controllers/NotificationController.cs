using DigiForum_BE.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;


namespace DigiForum_BE.Controllers
{
    [Route("api/Notification")]
    [ApiController]
    public class NotificationController : ControllerBase
    {
        private readonly AppDbContext _context;

        public NotificationController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("add")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AddNotification([FromBody] Notification notification)
        {
            _context.Notifications.Add(notification);
            await _context.SaveChangesAsync();
            return Ok(notification);
        }

        [HttpGet("get-list-notifications-by-user")]
        [Authorize(Roles = "Admin,User")]
        public async Task<IActionResult> GetNotificationsByUserId([FromBody] Guid userId)
        {
            var notifications = await _context.Notifications
                .Where(n => n.UserId == userId)
                .ToListAsync();

            return Ok(notifications);
        }

        [HttpPut("update")]
        [Authorize(Roles = "Admin,User")]
        public async Task<IActionResult> UpdateNotification([FromBody] Guid notificationId)
        {
            var notification = await _context.Notifications.FindAsync(notificationId);
            if (notification == null)
                return NotFound("Notification không tồn tại.");

            notification.IsRead = true;
            await _context.SaveChangesAsync();
            return Ok("Notification cập nhật thành công.");
        }

        [HttpPut("update-isread")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> UpdateIsReadStatus([FromBody] Guid notificationId)
        {
            var userIdFromToken = User.FindFirstValue("user_id");

            if (string.IsNullOrEmpty(userIdFromToken))
            {
                return BadRequest("Không tìm thấy thông tin người dùng trong token.");
            }

            if (!Guid.TryParse(userIdFromToken, out Guid parsedUserId))
            {
                return BadRequest("user_id không hợp lệ.");
            }

            var notification = await _context.Notifications
                .Where(n => n.NotificationId == notificationId && n.UserId == parsedUserId)
                .FirstOrDefaultAsync();

            if (notification == null)
            {
                return NotFound("Thông báo không tồn tại hoặc bạn không có quyền sửa thông báo này.");
            }

            notification.IsRead = true;

            await _context.SaveChangesAsync();

            return Ok("Cập nhật trạng thái thông báo thành công.");
        }

        [HttpDelete("delete")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteNotification([FromBody] Guid notificationId)
        {
            var notification = await _context.Notifications.FindAsync(notificationId);
            if (notification == null)
                return NotFound("Notification không tồn tại.");

            _context.Notifications.Remove(notification);
            await _context.SaveChangesAsync();
            return Ok("Xóa thông báo thành công.");
        }
    }

}
