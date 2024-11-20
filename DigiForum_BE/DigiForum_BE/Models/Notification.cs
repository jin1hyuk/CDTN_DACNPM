namespace DigiForum_BE.Models
{
    public class Notification
    {
        public Guid? NotificationId { get; set; } = Guid.NewGuid();
        public string? Message { get; set; }
        public bool? IsRead { get; set; } = false;
        public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;

        // Foreign Key liên kết với User
        public Guid? UserId { get; set; }
        public User? User { get; set; }

        // Foreign Key liên kết với Post (nếu cần thiết)
        public Guid? PostId { get; set; }
        public Post? Post { get; set; }
    }

}
