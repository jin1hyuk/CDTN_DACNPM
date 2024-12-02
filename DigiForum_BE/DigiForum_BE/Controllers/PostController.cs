using DigiForum_BE.Models;
using DigiForum_BE.Models.DTOs.Post;
using DigiForum_BE.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Threading.Tasks;
using System.Security.Claims;

namespace DigiForum_BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly PostService _postService;

        public PostController(PostService postService)
        {
            _postService = postService;
        }
        [HttpGet("personal/get-posts-approved")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> GetPostsApprovedByUserId()
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

            var posts = await _postService.GetPostsApprovedAsync(parsedUserId);

            return Ok(posts);
        }

        [HttpGet("personal/get-posts-declined")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> GetPostsDeclinedByUserId()
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

            var posts = await _postService.GetPostsDeclinedAsync(parsedUserId);

            return Ok(posts);
        }

        [HttpGet("admin/get-all-posts")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllPosts()
        {
            var posts = await _postService.GetAllPostsAsync();

            return Ok(posts);
        }


        [HttpGet("personal/get-posts-pending")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> GetPostsPendingByUserId()
        {
            var userId = User.FindFirstValue("user_id");
            if (userId == null || !Guid.TryParse(userId, out Guid parsedUserId))
            {
                return BadRequest("Không tìm thấy thông tin người dùng trong token.");
            }

            var posts = await _postService.GetPostsByStatusAndUserIdAsync("pending", parsedUserId);
            return Ok(posts);
        }

        [HttpPost("personal/add-post")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> AddPost([FromBody] PostCreateRequest post)
        {
            var userId = User.FindFirstValue("user_id");
            if (userId == null || !Guid.TryParse(userId, out Guid parsedUserId))
            {
                return BadRequest("Không tìm thấy thông tin người dùng trong token.");
            }

            var result = await _postService.AddPostAsync(post, parsedUserId);
            return result == "Tạo bài đăng thành công." ? Ok(result) : BadRequest(result);
        }

        [HttpPut("admin/update-post-status")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdatePostStatus([FromBody] UpdatePostStatusRequest request)
        {
            var userId = User.FindFirstValue("user_id");
            if (userId == null || !Guid.TryParse(userId, out Guid parsedUserId))
            {
                return BadRequest("Không tìm thấy thông tin người dùng trong token.");
            }

            var result = await _postService.UpdatePostStatusAsync(request, parsedUserId);
            return result == "Cập nhật trạng thái bài viết thành công." ? Ok(result) : BadRequest(result);
        }

        [HttpPut("personal/update-post")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> UpdatePost([FromBody] PostUpdateRequest post)
        {
            var userId = User.FindFirstValue("user_id");
            if (userId == null || !Guid.TryParse(userId, out Guid parsedUserId))
            {
                return BadRequest("Không tìm thấy thông tin người dùng trong token.");
            }

            var result = await _postService.UpdatePostAsync(post, parsedUserId);
            return result == "Cập nhật bài đăng thành công." ? Ok(result) : BadRequest(result);
        }

        [HttpDelete("personal/delete-post")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> DeletePostByUserId([FromBody] Guid postId)
        {
            var userId = User.FindFirstValue("user_id");
            if (userId == null || !Guid.TryParse(userId, out Guid parsedUserId))
            {
                return BadRequest("Không tìm thấy thông tin người dùng trong token.");
            }

            var result = await _postService.DeletePostAsync(postId, parsedUserId);
            return result == "Xóa bài đăng thành công." ? Ok(result) : BadRequest(result);
        }

        [HttpDelete("admin/delete-post")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeletePostByAdmin([FromBody] Guid postId)
        {
            var userId = User.FindFirstValue("user_id");
            if (userId == null || !Guid.TryParse(userId, out Guid parsedUserId))
            {
                return BadRequest("Không tìm thấy thông tin người dùng trong token.");
            }

            var result = await _postService.DeletePostByAdminAsync(postId, parsedUserId);
            return result == "Xóa bài đăng thành công." ? Ok(result) : BadRequest(result);
        }
    }
}
