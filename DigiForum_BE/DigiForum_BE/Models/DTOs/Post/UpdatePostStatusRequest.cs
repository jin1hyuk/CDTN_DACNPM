namespace DigiForum_BE.Models.DTOs.Post
{
    public class UpdatePostStatusRequest
    {
        public Guid PostId { get; set; }
        public string NewStatus { get; set; }
    }
}
