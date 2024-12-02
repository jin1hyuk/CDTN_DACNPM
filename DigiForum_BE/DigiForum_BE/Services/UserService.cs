using DigiForum_BE.Models;
using DigiForum_BE.Models.DTOs.Auth;
using Microsoft.EntityFrameworkCore;
using DigiForum_BE.Models.Enum;
using DigiForum_BE.Models.DTOs.User;
using System.Security.Claims;

namespace DigiForum_BE.Services
{
    public class UserService
    {
        private readonly AppDbContext _ctx;
        private readonly AuthService _auths;
        private readonly PasswordService _passwords;
        private readonly BCryptService _bCrypts;
        public UserService(AppDbContext context, AuthService authService, PasswordService passwords, BCryptService bCrypts)
        {
            _ctx = context;
            _auths = authService;
            _passwords = passwords;
            _bCrypts = bCrypts;
        }

        //Check
        public async Task<bool> IsEmailExist(string email)
        {
            return await _ctx.Users.AnyAsync(u => u.Email == email);
        }

        public string Authenticate(string email, string password)
        {
            var user = _ctx.Users.SingleOrDefault(u => u.Email == email);
            if (user == null) throw new Exception("Email không tồn tại.");
            if (!_bCrypts.VerifyPassword(user.Password, password))
            {
                throw new Exception("Mật khẩu không đúng.");
            }
            return _auths.GenerateToken(user);
        }
        //Get
        public async Task<List<User>> GetAllUsers()
        {
            return await _ctx.Users.ToListAsync();
        }
        public async Task<User> GetUserByToken(ClaimsPrincipal userPrincipal)
        {
            var userId = userPrincipal.FindFirstValue("user_id");
            return userId != null ? await _ctx.Users.SingleOrDefaultAsync(u => u.Id.ToString() == userId) : null;
        }
        //Create
        public async Task<User> CreateUser(SignupRequest signupRequest)
        {
            _passwords.ValidatePassword(signupRequest.Password);
            var user = new User
            {
                FullName = signupRequest.FullName,
                Email = signupRequest.Email,
                Password = _bCrypts.HashPassword(signupRequest.Password),
                Roles = Role.User,
                Id = Guid.NewGuid()
            };
            user.Id = Guid.NewGuid();
            user.Roles = Role.User;

            await _ctx.Users.AddAsync(user);
            await _ctx.SaveChangesAsync();

            return user;
        }
        //Put
        public async Task ResetPassword(string email, string verificationCode, string newPassword)
        {
            var user = await _ctx.Users.SingleOrDefaultAsync(u => u.Email == email);

            if (user == null) throw new Exception("Email không tồn tại.");
            if (user.VerificationCode != verificationCode) throw new Exception("Mã xác minh không hợp lệ.");
            if (user.VerificationCodeExpiration < DateTime.Now) throw new Exception("Mã xác minh đã hết hạn.");
            _passwords.ValidatePassword(newPassword);
            user.Password = _bCrypts.HashPassword(newPassword);
            user.VerificationCode = null;
            user.VerificationCodeExpiration = null;

            await _ctx.SaveChangesAsync();
        }

        public async Task UpdateUserStatus(UpdateUserStatusRequest request)
        {
            var user = await _ctx.Users.FindAsync(request.Id);
            if (user == null) throw new Exception("Người dùng không tồn tại.");
            user.IsActive = request.IsActive;
            user.UpdatedAt = DateTime.UtcNow;
            await _ctx.SaveChangesAsync();
        }

        public async Task UpdateUserInformation(Guid userId, UpdateUserInfoRequest request)
        {
            var user = await _ctx.Users.FindAsync(userId);
            if (user == null) throw new Exception("Người dùng không tồn tại.");

            user.FullName = request.FullName ?? user.FullName;
            user.Email = request.Email ?? user.Email;
            user.Birthdate = request.Birthdate ?? user.Birthdate;
            user.PhoneNumber = request.PhoneNumber ?? user.PhoneNumber;
            user.Address = request.Address ?? user.Address;
            user.Avatar = request.Avatar ?? user.Avatar;

            user.UpdatedAt = DateTime.UtcNow;
            await _ctx.SaveChangesAsync();
        }

        public async Task ChangePassword(Guid userId, ChangePasswordRequest request)
        {
            var user = await _ctx.Users.FindAsync(userId);
            if (user == null) throw new Exception("Người dùng không tồn tại.");
            if (!_bCrypts.VerifyPassword(user.Password, request.OldPassword))
            {
                throw new Exception("Mật khẩu cũ không đúng.");
            }
            _passwords.ValidatePassword(request.NewPassword);
            if (request.NewPassword == request.OldPassword) throw new Exception("Không được nhập giống mật khẩu cũ.");
            if (request.NewPassword != request.ConfirmNewPassword) throw new Exception("Xác minh mật khẩu không khớp.");

            user.Password = _bCrypts.HashPassword(request.NewPassword);
            user.UpdatedAt = DateTime.UtcNow;
            await _ctx.SaveChangesAsync();
        }

        public async Task UpdateUserRole(UpdateUserRoleRequest request)
        {
            var user = await _ctx.Users.FindAsync(request.Id);
            if (user == null) throw new Exception("Người dùng không tồn tại.");

            user.Roles = request.Roles;
            user.UpdatedAt = DateTime.UtcNow;
            await _ctx.SaveChangesAsync();
        }
        //Delete
        public async Task DeleteUser(Guid id)
        {
            var user = await _ctx.Users.FindAsync(id);
            if (user == null) throw new Exception("Người dùng không tồn tại.");

            _ctx.Users.Remove(user);
            await _ctx.SaveChangesAsync();
        }
    }
}
