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
    public class PostController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PostController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("personal/add-post")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> AddPost([FromBody] Post post)
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

            post.UserId = parsedUserId;
            post.Status = "pending";

            _context.Posts.Add(post);
            await _context.SaveChangesAsync();

            var notification = new Notification
            {
                UserId = parsedUserId,
                PostId = post.PostId,
                Message = $"Bài viết '{post.Title}' của bạn đã được tạo và đang chờ duyệt.",
                CreatedAt = DateTime.UtcNow,
                IsRead = false 
            };

            _context.Notifications.Add(notification);
            await _context.SaveChangesAsync();

            return Ok("Tạo bài đăng thành công.");
        }

        [HttpGet("user/posts-pending")]
        [Authorize(Roles = "User,Admin")]
        public async Task<IActionResult> GetPostsPendingByUserId()
        {
            var userId = User.FindFirstValue("user_id");

            if (userId == null)
            {
                return BadRequest("Không tìm thấy thông tin người dùng trong token.");
            }

            // Chuyển đổi userId thành Guid
            if (!Guid.TryParse(userId, out Guid parsedUserId))
            {
                return BadRequest("user_id không hợp lệ.");
            }

            // Lấy danh sách bài đăng có status là pending và UserId từ token
            var posts = await _context.Posts
                .Where(p => p.UserId == parsedUserId && p.Status == "pending")
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
                    User = new {
                        p.User.Id,
                        p.User.FullName,
                        p.User.ProfilePictureUrl
                    }
                })
                .ToListAsync();

            return Ok(posts);
        }

        [HttpGet("user/posts-approved")]
        [Authorize(Roles = "User,Admin")]
        public async Task<IActionResult> GetPostsApprovedByUserId()
        {
            var userId = User.FindFirstValue("user_id");

            if (userId == null)
            {
                return BadRequest("Không tìm thấy thông tin người dùng trong token.");
            }

            // Chuyển đổi userId thành Guid
            if (!Guid.TryParse(userId, out Guid parsedUserId))
            {
                return BadRequest("user_id không hợp lệ.");
            }

            // Lấy danh sách bài đăng có status là approved và UserId từ token
            var posts = await _context.Posts
                .Where(p => p.UserId == parsedUserId && p.Status == "approved")
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
                    User = new {
                        p.User.Id,
                        p.User.FullName,
                        p.User.ProfilePictureUrl
                    }
                })
                .ToListAsync();

            return Ok(posts);
        }
        [HttpGet("user/posts-declined")]
        [Authorize(Roles = "User,Admin")]
        public async Task<IActionResult> GetPostsDeclinedByUserId()
        {
            var userId = User.FindFirstValue("user_id");

            if (userId == null)
            {
                return BadRequest("Không tìm thấy thông tin người dùng trong token.");
            }

            // Chuyển đổi userId thành Guid
            if (!Guid.TryParse(userId, out Guid parsedUserId))
            {
                return BadRequest("user_id không hợp lệ.");
            }

            var posts = await _context.Posts
                .Where(p => p.UserId == parsedUserId && p.Status == "declined")
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
                    User = new {
                        p.User.Id,
                        p.User.FullName,
                        p.User.ProfilePictureUrl
                    }
                })
                .ToListAsync();

            return Ok(posts);
        }

        [HttpGet("all")]
        [Authorize(Roles = "Admin")]
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
                    User = new {
                        p.User.Id,
                        p.User.FullName,
                        p.User.ProfilePictureUrl
                    }
                })
                .ToListAsync();

            return Ok(posts);
        }

        [HttpGet("all-approved")]
        public async Task<IActionResult> GetAllApprovedPosts()
        {
            var posts = await _context.Posts
                .Where(p => p.Status == "approved")
                .Include(p => p.User) // Bao gồm thông tin User
                .Select(p => new
                {
                    p.PostId,
                    p.Title,
                    p.Content,
                    p.ImagePath,
                    p.CreatedAt,
                    p.UpdatedAt,
                    p.Status,
                    User = new {
                        p.User.Id,
                        p.User.FullName,
                        p.User.ProfilePictureUrl
                    },
                    LikeCount = _context.Likes.Count(l => l.PostId == p.PostId && l.isLike == true),
                    DisLikeCount = _context.Likes.Count(l => l.PostId == p.PostId && l.isLike == false),
                    CommentCount = _context.Comments.Count(l => l.PostId == p.PostId)
                })
                .ToListAsync();

            return Ok(posts);
        }


        [HttpGet("all-pending")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllPendingPosts()
        {
            var posts = await _context.Posts
                .Where(p => p.Status == "pending")
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
                    User = new {
                        p.User.Id,
                        p.User.FullName,
                        p.User.ProfilePictureUrl
                    }
                })
                .ToListAsync();

            return Ok(posts);
        }

        [HttpGet("all-declined")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllDeclinedPosts()
        {
            var posts = await _context.Posts
                .Where(p => p.Status == "declined")
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
                    User = new {
                        p.User.Id,
                        p.User.FullName,
                        p.User.ProfilePictureUrl
                    }
                })
                .ToListAsync();

            return Ok(posts);
        }

        public class UpdatePostRequest
        {
            public Guid PostId { get; set; }
            public string NewStatus { get; set; }
        }

        [HttpPut("update-status")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdatePostStatus([FromBody] UpdatePostRequest request)
        {
            var validStatuses = new[] { "pending", "approved", "declined" };
            if (!validStatuses.Contains(request.NewStatus))
            {
                return BadRequest("Trạng thái không hợp lệ.");
            }

            var post = await _context.Posts.FindAsync(request.PostId);
            if (post == null)
            {
                return NotFound("Bài đăng không tồn tại.");
            }

            // Lấy userId từ token
            var userId = User.FindFirstValue("user_id");

            if (userId == null)
            {
                return BadRequest("Không tìm thấy thông tin người dùng trong token.");
            }

            // Chuyển đổi userId thành Guid
            if (!Guid.TryParse(userId, out Guid parsedUserId))
            {
                return BadRequest("user_id không hợp lệ.");
            }

            post.Status = request.NewStatus;
            post.UpdatedAt = DateTime.UtcNow;  

            await _context.SaveChangesAsync();

            var adminUser = await _context.Users.FindAsync(parsedUserId);

            if (request.NewStatus == "approved")
            {
                var notification = new Notification
                {
                    SenderId = parsedUserId, 
                    UserId = post.UserId, 
                    Message = $"Bài viết của bạn đã được duyệt bởi Admin {adminUser.FullName}.",
                    CreatedAt = DateTime.UtcNow,
                };

                _context.Notifications.Add(notification);
                await _context.SaveChangesAsync();
            }

            else if (request.NewStatus == "declined")
            {
                var notification = new Notification
                {
                    SenderId = parsedUserId,
                    UserId = post.UserId,
                    Message = $"Bài viết của bạn đã bị từ chối bởi Admin {adminUser.FullName}.",
                    CreatedAt = DateTime.UtcNow,
                };

                _context.Notifications.Add(notification);
                await _context.SaveChangesAsync();
            }

            return Ok("Cập nhật trạng thái bài viết thành công.");
        }



        [HttpPut("update-post")]
        [Authorize(Roles = "Admin,User")]
        public async Task<IActionResult> UpdatePost([FromBody] Post post)
        {
            var userId = User.FindFirstValue("user-id");

            var existingPost = await _context.Posts
                .Where(p => p.PostId == post.PostId && p.UserId == Guid.Parse(userId))
                .FirstOrDefaultAsync();

            if (existingPost == null)
            {
                return NotFound("Bài đăng không tồn tại hoặc bạn không có quyền cập nhật bài đăng này.");
            }

            existingPost.Title = post.Title ?? existingPost.Title;
            existingPost.Content = post.Content ?? existingPost.Content;
            existingPost.ImagePath = post.ImagePath ?? existingPost.ImagePath;
            existingPost.Status = "pending";
            existingPost.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return Ok("Cập nhật bài đăng thành công.");
        }


        [HttpDelete("delete")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeletePost([FromBody] Guid postId)
        {
            // Tìm bài đăng theo postId
            var post = await _context.Posts.FindAsync(postId);
            if (post == null)
            {
                return NotFound("Bài đăng không tồn tại.");
            }

            var likesToRemove = _context.Likes.Where(l => l.PostId == postId);
            _context.Likes.RemoveRange(likesToRemove);

            _context.Posts.Remove(post);
            await _context.SaveChangesAsync();

            return Ok("Xóa bài đăng và tất cả các like liên quan thành công.");
        }


        [HttpDelete("delete-post-by-userId")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeletePostByUserId([FromBody] Guid postId)
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

            var post = await _context.Posts.FindAsync(postId);
            if (post == null)
            {
                return NotFound("Bài đăng không tồn tại.");
            }

            if (post.UserId == parsedUserId)
            {
                // Xóa tất cả like của bài đăng này
                var likesToDelete = await _context.Likes
                    .Where(l => l.PostId == postId)
                    .ToListAsync();

                if (likesToDelete.Any())
                {
                    _context.Likes.RemoveRange(likesToDelete); // Xóa tất cả like
                }

                // Xóa bài đăng
                _context.Posts.Remove(post);
                await _context.SaveChangesAsync();
                return Ok("Xóa bài đăng và tất cả like liên quan thành công.");
            }
            else
            {
                return Unauthorized("Bạn không xóa bài đăng này được.");
            }
        }


    }
}
