namespace DigiForum_BE.Models
{   
    public record User
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Name { get; set; }
        public string Avatar { get; set; }
        public string DiaChi { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string[] Roles { get; set; }

        // Constructor mặc định
        public User() { }
    }
}
