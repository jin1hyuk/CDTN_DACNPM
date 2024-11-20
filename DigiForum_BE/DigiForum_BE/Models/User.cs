namespace DigiForum_BE.Models
{
    public record User
    {
        public Guid? Id { get; set; } = Guid.NewGuid();
        public string? Username { get; set; }
        public string? Email { get; set; }
        public string? FullName { get; set; }
        public DateTime? Date { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Address { get; set; }
        public string? Password { get; set; }
        public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        public bool? IsActive { get; set; } = true;
        public string? ProfilePictureUrl { get; set; }
        public string? VerificationCode { get; set; }
        public DateTime? VerificationCodeExpiration { get; set; }
        public Role? Roles { get; set; }
        public User() { }
    }

    public enum Role
    {
        Admin,
        User,
        AdsUser
    }
}
