﻿namespace DigiForum_BE.Models.DTOs.Auth
{
    public class SignupRequest
    {
        public string? FullName { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
    }
}
