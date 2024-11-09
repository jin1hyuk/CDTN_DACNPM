using DigiForum_BE.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


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

        // Thêm Notification mới
        [HttpPost("add")]
        public async Task<IActionResult> AddNotification(Guid userId, [FromBody] Notification notification)
        {
            notification.UserId = userId;
            _context.Notifications.Add(notification);
            await _context.SaveChangesAsync();
            return Ok(notification);
        }

        // Lấy tất cả Notifications theo UserId
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetNotificationsByUserId(Guid userId)
        {
            var notifications = await _context.Notifications
                .Where(n => n.UserId == userId)
                .ToListAsync();

            return Ok(notifications);
        }

        // Cập nhật trạng thái đọc của Notification
        [HttpPut("update/{notificationId}")]
        public async Task<IActionResult> UpdateNotification(Guid notificationId)
        {
            var notification = await _context.Notifications.FindAsync(notificationId);
            if (notification == null)
                return NotFound("Notification không tồn tại.");

            notification.IsRead = true;
            await _context.SaveChangesAsync();
            return Ok("Notification cập nhật thành công.");
        }

        // Xóa Notification
        [HttpDelete("delete/{notificationId}")]
        public async Task<IActionResult> DeleteNotification(Guid notificationId)
        {
            var notification = await _context.Notifications.FindAsync(notificationId);
            if (notification == null)
                return NotFound("Notification không tồn tại.");

            _context.Notifications.Remove(notification);
            await _context.SaveChangesAsync();
            return Ok("Notification xóa thành công.");
        }
    }

}
