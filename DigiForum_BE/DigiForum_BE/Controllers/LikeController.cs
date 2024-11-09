using Microsoft.AspNetCore.Mvc;
using DigiForum_BE.Models;
using System;
using System.Linq;
using System.Threading.Tasks;

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

        // GET: api/Like/{postId}
        [HttpGet("{postId}")]
        public IActionResult GetLikes(Guid postId)
        {
            var likes = _context.Likes.Where(l => l.PostId == postId).ToList();
            return Ok(likes);
        }

        // POST: api/Like
        [HttpPost]
        public async Task<IActionResult> AddLike([FromBody] Like like)
        {
            like.LikeId = Guid.NewGuid(); // Tạo mới LikeId với Guid
            _context.Likes.Add(like);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetLikes), new { postId = like.PostId }, like);
        }

        // DELETE: api/Like/{likeId}
        [HttpDelete("{likeId}")]
        public async Task<IActionResult> DeleteLike(Guid likeId)
        {
            var like = await _context.Likes.FindAsync(likeId);
            if (like == null)
            {
                return NotFound();
            }

            _context.Likes.Remove(like);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
