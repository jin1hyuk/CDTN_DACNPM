using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DigiForum_BE.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DigiForum_BE.Models;

namespace DigiForum_BE.Controllers
{
    [ApiController]
    [Route("api/posts")]
    public class PostController : ControllerBase
    {
        private readonly AppDbContext _ctx;

        public PostController(AppDbContext context)
        {
            _ctx = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreatePost([FromBody] Post post)
        {
            post.CreatedAt = DateTime.Now;
            post.UpdatedAt = DateTime.Now;
            _ctx.Posts.Add(post);
            await _ctx.SaveChangesAsync();
            return Ok(post);
        }

        [HttpGet("{postId}")]
        public async Task<IActionResult> GetPostById(int postId)
        {
            var post = await _ctx.Posts.FindAsync(postId);
            if (post == null) return NotFound("Bài đăng không tồn tại.");

            return Ok(new List<Post> { post }); // Trả về danh sách chứa bài đăng
        }

        [HttpPut("{postId}")]
        public async Task<IActionResult> UpdatePost(int postId, [FromBody] Post post)
        {
            if (postId != post.PostId) return BadRequest("ID bài đăng không khớp.");

            var existingPost = await _ctx.Posts.FindAsync(postId);
            if (existingPost == null) return NotFound("Bài đăng không tồn tại.");

            existingPost.Title = post.Title;
            existingPost.Content = post.Content;
            existingPost.UpdatedAt = DateTime.Now;
            existingPost.Status = post.Status;
            existingPost.ImagePath = post.ImagePath;

            _ctx.Posts.Update(existingPost);
            await _ctx.SaveChangesAsync();

            return Ok("Update thành công"); // Trả về thông báo cập nhật thành công
        }

        [HttpDelete("{postId}")]
        public async Task<IActionResult> DeletePost(int postId)
        {
            var post = await _ctx.Posts.FindAsync(postId);
            if (post == null) return NotFound("Bài đăng không tồn tại.");

            _ctx.Posts.Remove(post);
            await _ctx.SaveChangesAsync();

            return Ok("Xóa thành công"); // Trả về thông báo xóa thành công
        }

        [HttpGet]
        public async Task<IActionResult> GetAllPosts()
        {
            var posts = await _ctx.Posts.ToListAsync();
            return Ok(posts); // Trả về danh sách tất cả bài đăng
        }
    }
}

