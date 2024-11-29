using Microsoft.AspNetCore.Mvc;
using DigiForum_BE.Models;
using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;

namespace DigiForum_BE.Controllers
{
    [Route("api/Comment")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CommentController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("get-all-comment-in-post")]
        public IActionResult GetComments([FromBody] Guid postId)
        {
            var comments = _context.Comments
                .Where(c => c.PostId == postId)
                .Include(c => c.User)
                .Select(c => new
                {
                    c.CommentId,
                    c.Content,
                    c.CreatedAt,
                    c.UpdatedAt,
                    User = new
                    {
                        c.User.Id,
                        c.User.FullName,
                        c.User.Avatar
                    }
                })
                .ToList();

            return Ok(comments);
        }


        [HttpPost("personal/add-comment")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> AddComment([FromBody] Comment comment)
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

            if (comment.PostId == null)
            {
                return BadRequest("Cần truyền đủ PostId.");
            }

            comment.CommentId = Guid.NewGuid(); 
            comment.UserId = parsedUserId; 
            comment.CreatedAt = DateTime.Now;

            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();

            return Ok("Tạo comment thành công");
        }

        [HttpPut("update")]
        [Authorize(Roles = "Admin,User")]
        public async Task<IActionResult> UpdateComment([FromBody] Comment updatedComment)
        {
            var comment = await _context.Comments.FindAsync(updatedComment.CommentId);
            if (comment == null)
            {
                return NotFound();
            }

            var userIdFromToken = User.FindFirstValue("user_id");
            if (string.IsNullOrEmpty(userIdFromToken) || !Guid.TryParse(userIdFromToken, out Guid parsedUserId) || comment.UserId != parsedUserId)
            {
                return Unauthorized("Bạn không có quyền sửa comment này.");
            }

            comment.Content = updatedComment.Content;
            comment.UpdatedAt = DateTime.Now;
            await _context.SaveChangesAsync();
            return Ok("Cập nhật comment thành công!");
        }

        [HttpDelete("delete")]
        [Authorize(Roles = "Admin,User")]
        public async Task<IActionResult> DeleteComment([FromBody] Guid commentId)
        {
            var comment = await _context.Comments.FindAsync(commentId);
            if (comment == null)
            {
                return NotFound();
            }

            var userIdFromToken = User.FindFirstValue("user_id");
            if (string.IsNullOrEmpty(userIdFromToken) || !Guid.TryParse(userIdFromToken, out Guid parsedUserId) || comment.UserId != parsedUserId)
            {
                return Unauthorized("Bạn không có quyền xóa comment này.");
            }

            _context.Comments.Remove(comment);
            await _context.SaveChangesAsync();
            return Ok("Xóa comment thành công!");
        }

        [HttpDelete("admin/delete")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteUserComment([FromBody] Guid commentId)
        {
            var comment = await _context.Comments.FindAsync(commentId);
            if (comment == null)
            {
                return NotFound();
            }

            // Lấy role từ token
            var userRole = User.FindFirstValue(ClaimTypes.Role); 
            var userIdFromToken = User.FindFirstValue("user_id");

            // Kiểm tra role có phải Admin không
            if (userRole == "Admin")
            {
                // Nếu là Admin, cho phép xóa comment
                _context.Comments.Remove(comment);
                await _context.SaveChangesAsync();
                return Ok("Xóa comment thành công (Admin).");
            }

            // Nếu không phải Admin, kiểm tra quyền sở hữu
            if (string.IsNullOrEmpty(userIdFromToken) || !Guid.TryParse(userIdFromToken, out Guid parsedUserId) || comment.UserId != parsedUserId)
            {
                return Unauthorized("Bạn không có quyền xóa comment này.");
            }

            // Nếu là user hợp lệ, cho phép xóa comment của chính họ
            _context.Comments.Remove(comment);
            await _context.SaveChangesAsync();
            return Ok("Xóa comment thành công.");
        }
    }
}
