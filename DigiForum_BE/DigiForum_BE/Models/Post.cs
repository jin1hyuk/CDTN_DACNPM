namespace DigiForum_BE.Models
{
    public class Post
    {
        public int PostId { get; set; }
        public int UserId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public string Status { get; set; } // Enum: "pending", "approved", "rejected"
        public string ImagePath { get; set; } // Đường dẫn tới ảnh
    }
}
