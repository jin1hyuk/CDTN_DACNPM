using DigiForum_BE.Models;
using Microsoft.EntityFrameworkCore;

namespace DigiForum_BE.Services
{
    public class PasswordService
    {
        private readonly AppDbContext _ctx;

        public PasswordService(AppDbContext context)
        {
            _ctx = context;
        }

        public async Task ResetPassword(string email, string verificationCode, string newPassword)
        {
            var user = await _ctx.Users.SingleOrDefaultAsync(u => u.Email == email);

            if (user == null) throw new Exception("Email không tồn tại.");
            if (user.VerificationCode != verificationCode) throw new Exception("Mã xác minh không hợp lệ.");
            if (user.VerificationCodeExpiration < DateTime.Now) throw new Exception("Mã xác minh đã hết hạn.");

            user.Password = newPassword;
            user.VerificationCode = null;
            user.VerificationCodeExpiration = null;

            await _ctx.SaveChangesAsync();
        }

        public async Task<string> GenerateVerificationCode(string email)
        {
            var user = await _ctx.Users.SingleOrDefaultAsync(u => u.Email == email);
            if (user == null) throw new Exception("Email không tồn tại.");

            string code = GenerateRandomCode(6);
            user.VerificationCode = code;
            user.VerificationCodeExpiration = DateTime.Now.AddMinutes(15);
            await _ctx.SaveChangesAsync();
            return code;
        }

        public bool ValidatePassword(string password)
        {
            if (password.Length < 8)
                throw new Exception("Mật khẩu phải có ít nhất 8 ký tự.");

            if (!password.Any(char.IsUpper))
                throw new Exception("Mật khẩu phải chứa ít nhất một ký tự in hoa.");

            if (!password.Any(char.IsDigit))
                throw new Exception("Mật khẩu phải chứa ít nhất một ký tự số.");

            if (!password.Any(ch => "!@#$%^&*()_+[]{}|;:,.<>?".Contains(ch)))
                throw new Exception("Mật khẩu phải chứa ít nhất một ký tự đặc biệt.");

            return true;
        }

        private string GenerateRandomCode(int length)
        {
            var random = new Random();
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }
    }
}
