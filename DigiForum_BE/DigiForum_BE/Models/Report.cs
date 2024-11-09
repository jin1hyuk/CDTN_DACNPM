namespace DigiForum_BE.Models
{
    public class Report
    {
        public Guid ReportId { get; set; } = Guid.NewGuid();
        public string ReportContent { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public Guid UserId { get; set; }
        public User User { get; set; }
        public Guid PostId { get; set; }
        public Post Post { get; set; }
    }

}
