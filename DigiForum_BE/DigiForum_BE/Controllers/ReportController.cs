using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DigiForum_BE.Models;
using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace DigiForum_BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ReportController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("add")]
        [Authorize(Roles = "User,Admin")]
        public async Task<IActionResult> AddReport([FromBody] Report report)
        {
            var userId = User.FindFirstValue("user_id");

            if (userId == null)
            {
                return BadRequest("Không tìm thấy thông tin người dùng trong token.");
            }

            if (!Guid.TryParse(userId, out Guid parsedUserId))
            {
                return BadRequest("user_id không hợp lệ.");
            }

            var user = await _context.Users.FindAsync(parsedUserId);
            if (user == null)
            {
                return BadRequest("User không tồn tại.");
            }

            report.UserId = parsedUserId;
            report.Status = "pending";  // Trạng thái mặc định là "pending"

            _context.Reports.Add(report);
            await _context.SaveChangesAsync();

            var notification = new Notification
            {
                UserId = parsedUserId,
                ReportId = report.ReportId,
                Message = $"Báo cáo '{report.Title}' của bạn đã được tạo và đang chờ duyệt.",
                CreatedAt = DateTime.UtcNow,
                IsRead = false
            };

            _context.Notifications.Add(notification);
            await _context.SaveChangesAsync();

            return Ok("Tạo báo cáo thành công.");
        }

        [HttpGet("admin/get-all")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllReports()
        {
            var userId = User.FindFirstValue("user_id");

            if (userId == null)
            {
                return BadRequest("Không tìm thấy thông tin người dùng trong token.");
            }

            if (!Guid.TryParse(userId, out Guid parsedUserId))
            {
                return BadRequest("user_id không hợp lệ.");
            }

            var user = await _context.Users.FindAsync(parsedUserId);
            if (user == null)
            {
                return BadRequest("User không tồn tại.");
            }
            var reports = await _context.Reports.ToListAsync();

            return Ok(reports);
        }


        [HttpGet("user/reports-pending")]
        [Authorize(Roles = "User,Admin")]
        public async Task<IActionResult> GetReportsPendingByUserId()
        {
            var userId = User.FindFirstValue("user_id");

            if (userId == null)
            {
                return BadRequest("Không tìm thấy thông tin người dùng trong token.");
            }

            if (!Guid.TryParse(userId, out Guid parsedUserId))
            {
                return BadRequest("user_id không hợp lệ.");
            }

            var reports = await _context.Reports
                .Where(r => r.UserId == parsedUserId && r.Status == "pending")
                .Include(r => r.User)
                .Select(r => new
                {
                    r.ReportId,
                    r.Title,
                    r.ReportContent,
                    r.CreatedAt,
                    r.Status,
                    User = new
                    {
                        r.User.Id,
                        r.User.FullName,
                        r.User.ProfilePictureUrl
                    }
                })
                .ToListAsync();

            return Ok(reports);
        }

        [HttpPut("update-status")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateReportStatus([FromBody] UpdateReportRequest request)
        {
            var validStatuses = new[] { "pending", "approved", "declined" };
            if (!validStatuses.Contains(request.NewStatus))
            {
                return BadRequest("Trạng thái không hợp lệ.");
            }

            var report = await _context.Reports.FindAsync(request.ReportId);
            if (report == null)
            {
                return NotFound("Báo cáo không tồn tại.");
            }

            var adminUserId = User.FindFirstValue("user_id");

            if (adminUserId == null)
            {
                return BadRequest("Không tìm thấy thông tin người dùng trong token.");
            }

            if (!Guid.TryParse(adminUserId, out Guid parsedAdminUserId))
            {
                return BadRequest("user_id không hợp lệ.");
            }

            report.Status = request.NewStatus;

            await _context.SaveChangesAsync();

            var adminUser = await _context.Users.FindAsync(parsedAdminUserId);

            var notification = new Notification
            {
                SenderId = parsedAdminUserId,
                UserId = report.UserId,
                Message = request.NewStatus == "approved"
                    ? $"Báo cáo của bạn đã được duyệt bởi Admin {adminUser.FullName}."
                    : $"Báo cáo của bạn đã bị từ chối bởi Admin {adminUser.FullName}.",
                CreatedAt = DateTime.UtcNow,
            };

            _context.Notifications.Add(notification);
            await _context.SaveChangesAsync();

            return Ok("Cập nhật trạng thái báo cáo thành công.");
        }

        [HttpDelete("delete")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteReport([FromBody] Guid reportId)
        {
            var report = await _context.Reports.FindAsync(reportId);
            if (report == null)
            {
                return NotFound("Báo cáo không tồn tại.");
            }

            var notificationsToRemove = _context.Notifications.Where(n => n.ReportId == reportId);
            _context.Notifications.RemoveRange(notificationsToRemove);

            _context.Reports.Remove(report);
            await _context.SaveChangesAsync();

            return Ok("Xóa báo cáo và tất cả thông báo liên quan thành công.");
        }

        public class UpdateReportRequest
        {
            public Guid ReportId { get; set; }
            public string NewStatus { get; set; }
        }
    }
}
