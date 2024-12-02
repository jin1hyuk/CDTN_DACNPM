using DigiForum_BE.Models.Enum;

namespace DigiForum_BE.Models.DTOs.User
{
    public class UpdateUserRoleRequest
    {
        public Guid? Id { get; set; }
        public Role? Roles { get; set; }
    }
}
