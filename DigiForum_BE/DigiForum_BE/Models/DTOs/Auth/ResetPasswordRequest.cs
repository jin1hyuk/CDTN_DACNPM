namespace DigiForum_BE.Models.DTOs.Auth
{
    public class ResetPasswordRequest
    {
        public string? VerificationCode { get; set; }
        public string? Email { get; set; }
        public string? NewPassword { get; set; }
    }
}
