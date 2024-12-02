namespace DigiForum_BE.Models.DTOs.Post
{
    public class PostDTO
    {
        public Guid? PostId { get; set; }
        public string? Title { get; set; }
        public string? Content { get; set; }
        public string? ImagePath { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public string? Status { get; set; }
        public UserDTO? User { get; set; }
    }
}
