using DigiForum_BE.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


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

        // Thêm Report mới
        [HttpPost("add")]
        public async Task<IActionResult> AddReport(Guid userId, Guid postId, [FromBody] Report report)
        {
            report.UserId = userId;
            report.PostId = postId;
            _context.Reports.Add(report);
            await _context.SaveChangesAsync();
            return Ok(report);
        }

        // Lấy tất cả Reports theo UserId
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetReportsByUserId(Guid userId)
        {
            var reports = await _context.Reports
                .Where(r => r.UserId == userId)
                .ToListAsync();

            return Ok(reports);
        }

        // Lấy tất cả Reports theo PostId
        [HttpGet("post/{postId}")]
        public async Task<IActionResult> GetReportsByPostId(Guid postId)
        {
            var reports = await _context.Reports
                .Where(r => r.PostId == postId)
                .ToListAsync();

            return Ok(reports);
        }

        // Xóa Report
        [HttpDelete("delete/{reportId}")]
        public async Task<IActionResult> DeleteReport(Guid reportId)
        {
            var report = await _context.Reports.FindAsync(reportId);
            if (report == null)
                return NotFound("Report không tồn tại.");

            _context.Reports.Remove(report);
            await _context.SaveChangesAsync();
            return Ok("Report xóa thành công.");
        }
    }

}
