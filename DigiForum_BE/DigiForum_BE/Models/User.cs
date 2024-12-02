using System.ComponentModel.DataAnnotations;
using DigiForum_BE.Models.Enum;

namespace DigiForum_BE.Models
{
    public record User
    {
        public Guid? Id { get; set; }
        [Required(ErrorMessage = "Email không được để trống.")]
        [EmailAddress(ErrorMessage = "Email không hợp lệ.")]
        public string? Email { get; set; }

        public string? FullName { get; set; }

        public DateTime? Birthdate { get; set; }

        public Gender? Gender { get; set; }

        public string? PhoneNumber { get; set; }

        public string? Address { get; set; }

        public string? Password { get; set; }

        public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        public bool? IsActive { get; set; } = true;
        public string? Avatar { get; set; }
        public string? VerificationCode { get; set; }
        public DateTime? VerificationCodeExpiration { get; set; }
        public Role? Roles { get; set; }

        public User() { }
    }
}
