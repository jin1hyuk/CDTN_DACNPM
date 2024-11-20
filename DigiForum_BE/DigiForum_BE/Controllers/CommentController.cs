using Microsoft.AspNetCore.Mvc;
using DigiForum_BE.Models;
using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

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

        [HttpGet]
        public IActionResult GetComments([FromBody] Guid postId)
        {
            var comments = _context.Comments.Where(c => c.PostId == postId).ToList();
            return Ok(comments);
        }

        [HttpPost]
        [Authorize(Roles = "Admin,User")]
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

            // Lấy thông tin người dùng từ token
            comment.CommentId = Guid.NewGuid(); // Tạo mới CommentId với Guid
            comment.UserId = parsedUserId; // Gán UserId từ token
            comment.CreatedAt = DateTime.Now;

            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetComments), new { postId = comment.PostId }, comment);
        }

        [HttpPut("{commentId}")]
        [Authorize(Roles = "Admin,User")]
        public async Task<IActionResult> UpdateComment(Guid commentId, [FromBody] Comment updatedComment)
        {
            var comment = await _context.Comments.FindAsync(commentId);
            if (comment == null)
            {
                return NotFound();
            }

            // Kiểm tra nếu người dùng không phải là chủ bài viết hoặc comment
            var userIdFromToken = User.FindFirstValue("user_id");
            if (string.IsNullOrEmpty(userIdFromToken) || !Guid.TryParse(userIdFromToken, out Guid parsedUserId) || comment.UserId != parsedUserId)
            {
                return Unauthorized("Bạn không có quyền sửa comment này.");
            }

            comment.Content = updatedComment.Content;
            comment.UpdatedAt = DateTime.Now;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{commentId}")]
        [Authorize(Roles = "Admin,User")]
        public async Task<IActionResult> DeleteComment(Guid commentId)
        {
            var comment = await _context.Comments.FindAsync(commentId);
            if (comment == null)
            {
                return NotFound();
            }

            // Kiểm tra nếu người dùng không phải là chủ bài viết hoặc comment
            var userIdFromToken = User.FindFirstValue("user_id");
            if (string.IsNullOrEmpty(userIdFromToken) || !Guid.TryParse(userIdFromToken, out Guid parsedUserId) || comment.UserId != parsedUserId)
            {
                return Unauthorized("Bạn không có quyền xóa comment này.");
            }

            _context.Comments.Remove(comment);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
