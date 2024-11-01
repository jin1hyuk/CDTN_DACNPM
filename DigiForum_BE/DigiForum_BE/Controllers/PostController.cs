using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DigiForum_BE.Models;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace DigiForum_BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PostController(AppDbContext context)
        {
            _context = context;
        }

        // Thêm bài đăng mới
        [HttpPost("add")]
        public async Task<IActionResult> AddPost([FromBody] Post post)
        {
            var user = await _context.Users.FindAsync(post.UserId);
            if (user == null)
            {
                return BadRequest("User không tồn tại.");
            }

            post.UserId = post.UserId;
            _context.Posts.Add(post);
            await _context.SaveChangesAsync();

            // Trả về bài đăng dưới dạng JSON kèm thông tin người đăng
            var result = await _context.Posts
                .Where(p => p.PostId == post.PostId)
                .Include(p => p.User)
                .Select(p => new
                {
                    p.PostId,
                    p.Title,
                    p.Content,
                    p.ImagePath,
                    p.CreatedAt,
                    p.UpdatedAt,
                    p.Status,
                    User = new { p.User.Id, p.User.Name, p.User.Email }
                })
                .FirstOrDefaultAsync();

            return Ok(result);
        }

        // Lấy bài đăng theo UserId
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetPostsByUserId(Guid userId)
        {
            var posts = await _context.Posts
                .Where(p => p.UserId == userId)
                .Include(p => p.User)
                .Select(p => new
                {
                    p.PostId,
                    p.Title,
                    p.Content,
                    p.ImagePath,
                    p.CreatedAt,
                    p.UpdatedAt,
                    p.Status,
                    User = new { p.User.Id, p.User.Name, p.User.Email }
                })
                .ToListAsync();

            return Ok(posts);
        }

        // Lấy tất cả bài đăng
        [HttpGet("all")]
        public async Task<IActionResult> GetAllPosts()
        {
            var posts = await _context.Posts
                .Include(p => p.User)
                .Select(p => new
                {
                    p.PostId,
                    p.Title,
                    p.Content,
                    p.ImagePath,
                    p.CreatedAt,
                    p.UpdatedAt,
                    p.Status,
                    User = new { p.User.Id, p.User.Name, p.User.Email }
                })
                .ToListAsync();

            return Ok(posts);
        }

        // Cập nhật bài đăng
        [HttpPut("update/{postId}")]
        public async Task<IActionResult> UpdatePost(Guid postId, [FromBody] Post post)
        {
            var existingPost = await _context.Posts.FindAsync(postId);
            if (existingPost == null)
            {
                return NotFound("Bài đăng không tồn tại.");
            }

            existingPost.Title = post.Title;
            existingPost.Content = post.Content;
            existingPost.ImagePath = post.ImagePath;
            existingPost.UpdatedAt = DateTime.UtcNow;
            existingPost.Status = post.Status;

            await _context.SaveChangesAsync();
            return Ok("Cập nhật bài đăng thành công.");
        }

        // Xóa bài đăng
        [HttpDelete("delete/{postId}")]
        public async Task<IActionResult> DeletePost(Guid postId)
        {
            var post = await _context.Posts.FindAsync(postId);
            if (post == null)
            {
                return NotFound("Bài đăng không tồn tại.");
            }

            _context.Posts.Remove(post);
            await _context.SaveChangesAsync();
            return Ok("Xóa bài đăng thành công.");
        }
    }
}
