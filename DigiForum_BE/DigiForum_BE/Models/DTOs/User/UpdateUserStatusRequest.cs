namespace DigiForum_BE.Models.DTOs.User
{
    public class UpdateUserStatusRequest
    {
        public Guid? Id { get; set; }
        public bool? IsActive { get; set; }
    }
}
