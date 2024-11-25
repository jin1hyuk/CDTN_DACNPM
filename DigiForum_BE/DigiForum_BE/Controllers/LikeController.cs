using Microsoft.AspNetCore.Mvc;
using DigiForum_BE.Models;
using System;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace DigiForum_BE.Controllers
{
    [Route("api/Like")]
    [ApiController]
    public class LikeController : ControllerBase
    {
        private readonly AppDbContext _context;

        public LikeController(AppDbContext context)
        {
            _context = context;
        }
        [HttpGet("TrueLikes")]
        public IActionResult GetTrueLikes([FromBody] Guid postId)
        {
            var likesWithUserInfo = _context.Likes
                .Where(l => l.PostId == postId && l.isLike == true)
                .Select(l => new
                {
                    l.LikeId,
                    l.PostId,
                    l.UserId,
                    User = new
                    {
                        l.User.Id,
                        l.User.FullName,
                        l.User.ProfilePictureUrl
                    }
                })
                .ToList();

            return Ok(likesWithUserInfo);
        }


        [HttpGet("FalseLikes")]
        public IActionResult GetFalseLikes([FromBody] Guid postId)
        {
            var DislikesWithUserInfo = _context.Likes
                .Where(l => l.PostId == postId && l.isLike == true)
                .Select(l => new
                {
                    l.LikeId,
                    l.PostId,
                    l.UserId,
                    User = new
                    {
                        l.User.Id,
                        l.User.FullName,
                        l.User.ProfilePictureUrl
                    }
                })
                .ToList();

            return Ok(DislikesWithUserInfo);
        }



        [HttpPost("add")]
        [Authorize(Roles = "Admin,User")]
        public async Task<IActionResult> AddLike([FromBody] Like like)
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

            if (like.PostId == null || like.isLike == null)
            {
                return BadRequest("Cần truyền đủ PostId và isLike.");
            }

            like.UserId = parsedUserId; 

            _context.Likes.Add(like);
            await _context.SaveChangesAsync();

            return Ok("Tạo like mới thành công");
        }

        [HttpPut("update")]
        [Authorize(Roles = "Admin,User")]
        public async Task<IActionResult> UpdateLike([FromBody] Like like)
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

            if (like.PostId == null)
            {
                return BadRequest("Cần truyền PostId.");
            }

            var existingLike = await _context.Likes
                .FirstOrDefaultAsync(l => l.PostId == like.PostId && l.UserId == parsedUserId);

            if (existingLike == null)
            {
                return NotFound("Không tìm thấy like của người dùng cho bài viết này.");
            }

            existingLike.isLike = !existingLike.isLike;

            await _context.SaveChangesAsync();

            return Ok("Cập nhật like thành công.");
        }

        [HttpDelete("delete")]
        [Authorize(Roles = "Admin,User")]
        public async Task<IActionResult> DeleteLike([FromBody] Like like)
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

            if (like.PostId == null)
            {
                return BadRequest("Cần truyền PostId.");
            }

            var existingLike = await _context.Likes
                .FirstOrDefaultAsync(l => l.PostId == like.PostId && l.UserId == parsedUserId);

            if (existingLike == null)
            {
                return NotFound("Không tìm thấy like của người dùng cho bài viết này.");
            }

            _context.Likes.Remove(existingLike);
            await _context.SaveChangesAsync();

            return Ok("Xóa like thành công");
        }

    }
}
