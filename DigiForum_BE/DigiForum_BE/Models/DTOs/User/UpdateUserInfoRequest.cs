namespace DigiForum_BE.Models.DTOs.User
{
    public class UpdateUserInfoRequest
    {
        public string? FullName { get; set; }
        public string? Email { get; set; }
        public DateTime? Birthdate { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Address { get; set; }
        public string? Avatar { get; set; }
    }
}
