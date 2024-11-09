using Microsoft.AspNetCore.Mvc;
using DigiForum_BE.Models;
using System;
using System.Linq;
using System.Threading.Tasks;

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

        // GET: api/Comment/{postId}
        [HttpGet("{postId}")]
        public IActionResult GetComments(Guid postId)
        {
            var comments = _context.Comments.Where(c => c.PostId == postId).ToList();
            return Ok(comments);
        }

        // POST: api/Comment
        [HttpPost]
        public async Task<IActionResult> AddComment([FromBody] Comment comment)
        {
            comment.CommentId = Guid.NewGuid(); // Tạo mới CommentId với Guid
            comment.CreatedAt = DateTime.Now;
            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetComments), new { postId = comment.PostId }, comment);
        }

        // PUT: api/Comment/{commentId}
        [HttpPut("{commentId}")]
        public async Task<IActionResult> UpdateComment(Guid commentId, [FromBody] Comment updatedComment)
        {
            var comment = await _context.Comments.FindAsync(commentId);
            if (comment == null)
            {
                return NotFound();
            }

            comment.Content = updatedComment.Content;
            comment.UpdatedAt = DateTime.Now;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/Comment/{commentId}
        [HttpDelete("{commentId}")]
        public async Task<IActionResult> DeleteComment(Guid commentId)
        {
            var comment = await _context.Comments.FindAsync(commentId);
            if (comment == null)
            {
                return NotFound();
            }

            _context.Comments.Remove(comment);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
