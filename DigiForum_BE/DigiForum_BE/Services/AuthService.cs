using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using DigiForum_BE.Helpers;
using DigiForum_BE.Models;
using Microsoft.IdentityModel.Tokens;


namespace DigiForum_BE.Services
{
    public class AuthService
    {
        public string GenerateToken(User user)
        {
            var handler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(AuthSettings.PrivateKey);
            var credentials = new SigningCredentials(
                new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = GenerateClaims(user),
                Expires = DateTime.UtcNow.AddMinutes(15),
                SigningCredentials = credentials,
            };

            var token = handler.CreateToken(tokenDescriptor);
            return handler.WriteToken(token);
        }

        private static ClaimsIdentity GenerateClaims(User user)
        {
            var claims = new ClaimsIdentity();
            claims.AddClaim(new Claim(ClaimTypes.Name, user.Email));
            claims.AddClaim(new Claim("user_id", user.Id.ToString()));
            // Nếu chỉ có một vai trò, không cần dùng foreach
            claims.AddClaim(new Claim(ClaimTypes.Role, user.Roles.ToString()));

            return claims;
        }
    }
}
