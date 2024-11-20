using System;

namespace DigiForum_BE.Models
{
    public class Like
    {
        public Guid? LikeId { get; set; } = Guid.NewGuid();
        public Guid? PostId { get; set; } 
        public Guid? UserId { get; set; } 
        public bool? isLike { get; set; }   

        // Navigation properties
        public Post? Post { get; set; }
        public User? User { get; set; }
    }
}
