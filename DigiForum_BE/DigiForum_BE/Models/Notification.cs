namespace DigiForum_BE.Models
{
    public class Notification
    {
        public Guid? NotificationId { get; set; } = Guid.NewGuid();
        public string? Message { get; set; }
        public bool? IsRead { get; set; } = false;
        public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;

        public Guid? UserId { get; set; }
        public User? User { get; set; }

        public Guid? PostId { get; set; }
        public Post? Post { get; set; }
        public Guid? ReportId { get; set; }
        public Report? Report { get; set; }

        public Guid? SenderId { get; set; }
        public User? Sender { get; set; }
    }

}
