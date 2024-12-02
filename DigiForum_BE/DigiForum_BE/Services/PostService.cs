using DigiForum_BE.Models;
using DigiForum_BE.Models.DTOs.Post;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace DigiForum_BE.Services
{
    public class PostService
    {
        private readonly AppDbContext _context;

        public PostService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<string> AddPostAsync(PostCreateRequest postRequest, Guid userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null) return "User không tồn tại.";

            var post = new Post
            {
                PostId = Guid.NewGuid(), 
                Title = postRequest.Title,
                Content = postRequest.Content,
                ImagePath = postRequest.ImagePath,
                CreatedAt = DateTime.UtcNow,
                UserId = userId, 
                Status = "pending"
            };

            _context.Posts.Add(post);
            await _context.SaveChangesAsync();

            // Thêm thông báo
            var notification = new Notification
            {
                UserId = userId,
                PostId = post.PostId,
                Message = $"Bài viết '{post.Title}' của bạn đã được tạo và đang chờ duyệt.",
                CreatedAt = DateTime.UtcNow,
                IsRead = false
            };

            _context.Notifications.Add(notification);
            await _context.SaveChangesAsync();

            return "Tạo bài đăng thành công.";
        }
        public async Task<List<PostDTO>> GetPostsApprovedAsync(Guid userId)
        {
            var posts = await _context.Posts
                .Where(p => p.UserId == userId && p.Status == "approved")
                .Include(p => p.User)
                .Select(p => new PostDTO
                {
                    PostId = p.PostId,
                    Title = p.Title,
                    Content = p.Content,
                    ImagePath = p.ImagePath,
                    CreatedAt = p.CreatedAt,
                    UpdatedAt = p.UpdatedAt,
                    Status = p.Status,
                    User = new UserDTO
                    {
                        Id = p.User.Id,
                        FullName = p.User.FullName,
                        Avatar = p.User.Avatar
                    }
                })
                .ToListAsync();

            return posts;
        }
        public async Task<List<PostDTO>> GetPostsDeclinedAsync(Guid userId)
        {
            var posts = await _context.Posts
                .Where(p => p.UserId == userId && p.Status == "declined")
                .Include(p => p.User)
                .Select(p => new PostDTO
                {
                    PostId = p.PostId,
                    Title = p.Title,
                    Content = p.Content,
                    ImagePath = p.ImagePath,
                    CreatedAt = p.CreatedAt,
                    UpdatedAt = p.UpdatedAt,
                    Status = p.Status,
                    User = new UserDTO
                    {
                        Id = p.User.Id,
                        FullName = p.User.FullName,
                        Avatar = p.User.Avatar
                    }
                })
                .ToListAsync();

            return posts;
        }
        public async Task<List<PostDTO>> GetAllPostsAsync()
        {
            var posts = await _context.Posts
                .Include(p => p.User)
                .Select(p => new PostDTO
                {
                    PostId = p.PostId,
                    Title = p.Title,
                    Content = p.Content,
                    ImagePath = p.ImagePath,
                    CreatedAt = p.CreatedAt,
                    UpdatedAt = p.UpdatedAt,
                    Status = p.Status,
                    User = new UserDTO
                    {
                        Id = p.User.Id,
                        FullName = p.User.FullName,
                        Avatar = p.User.Avatar
                    }
                })
                .ToListAsync();

            return posts;
        }

        public async Task<IQueryable<object>> GetPostsByStatusAndUserIdAsync(string status, Guid userId)
        {
            var posts = _context.Posts
                .Where(p => p.UserId == userId && p.Status == status)
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
                    User = new
                    {
                        p.User.Id,
                        p.User.FullName,
                        p.User.Avatar
                    }
                });

            return posts;
        }

        public async Task<string> UpdatePostStatusAsync(UpdatePostStatusRequest request, Guid adminUserId)
        {
            var validStatuses = new[] { "pending", "approved", "declined" };
            if (!validStatuses.Contains(request.NewStatus))
                return "Trạng thái không hợp lệ.";

            var post = await _context.Posts.FindAsync(request.PostId);
            if (post == null) return "Bài đăng không tồn tại.";

            post.Status = request.NewStatus;
            post.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            var adminUser = await _context.Users.FindAsync(adminUserId);

            // Thêm thông báo cho người dùng
            var notification = new Notification
            {
                SenderId = adminUserId,
                UserId = post.UserId,
                Message = request.NewStatus == "approved" ?
                    $"Bài viết của bạn đã được duyệt bởi Admin {adminUser.FullName}." :
                    $"Bài viết của bạn đã bị từ chối bởi Admin {adminUser.FullName}.",
                CreatedAt = DateTime.UtcNow,
            };

            _context.Notifications.Add(notification);
            await _context.SaveChangesAsync();

            return "Cập nhật trạng thái bài viết thành công.";
        }

        public async Task<string> UpdatePostAsync(PostUpdateRequest postRequest, Guid userId)
        {
            var existingPost = await _context.Posts
                .Where(p => p.PostId == postRequest.PostId && p.UserId == userId)
                .FirstOrDefaultAsync();

            if (existingPost == null) return "Bài đăng không tồn tại hoặc bạn không có quyền cập nhật bài đăng này.";

            existingPost.Title = postRequest.Title ?? existingPost.Title;
            existingPost.Content = postRequest.Content ?? existingPost.Content;
            existingPost.ImagePath = postRequest.ImagePath ?? existingPost.ImagePath;
            existingPost.Status = "pending";
            existingPost.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return "Cập nhật bài đăng thành công.";
        }

        public async Task<string> DeletePostAsync(Guid postId, Guid userId)
        {
            var post = await _context.Posts.FindAsync(postId);
            if (post == null) return "Bài đăng không tồn tại.";

            if (post.UserId != userId) return "Bạn không có quyền xóa bài đăng này.";

            _context.Posts.Remove(post);
            await _context.SaveChangesAsync();
            return "Xóa bài đăng thành công.";
        }

        public async Task<string> DeletePostByAdminAsync(Guid postId, Guid adminUserId)
        {
            var post = await _context.Posts.FindAsync(postId);
            if (post == null) return "Bài đăng không tồn tại.";

            var notification = new Notification
            {
                UserId = post.UserId,
                PostId = post.PostId,
                Message = $"Bài viết '{post.Title}' của bạn đã bị xóa bởi Admin.",
                CreatedAt = DateTime.UtcNow,
                IsRead = false
            };

            _context.Notifications.Add(notification);
            await _context.SaveChangesAsync();

            _context.Likes.RemoveRange(_context.Likes.Where(l => l.PostId == postId));
            _context.Posts.Remove(post);
            await _context.SaveChangesAsync();

            return "Xóa bài đăng thành công.";
        }
    }
}
