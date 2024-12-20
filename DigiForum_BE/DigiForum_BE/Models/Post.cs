﻿namespace DigiForum_BE.Models
{
    public record Post
    {
        public Guid PostId { get; set; } = Guid.NewGuid();
        public Guid UserId { get; set; } 
        public string Title { get; set; }
        public string Content { get; set; }
        public string ImagePath { get; set; } 
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        public string Status { get; set; }

        public User? User { get; set; }
    }
}
