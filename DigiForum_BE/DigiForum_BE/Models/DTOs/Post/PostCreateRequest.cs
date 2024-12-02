namespace DigiForum_BE.Models.DTOs.Post
{
    public class PostCreateRequest
    {
        public string? Title { get; set; }
        public string? Content { get; set; }
        public string? ImagePath { get; set; }
    }
}
