﻿namespace DigiForum_BE.Models.DTOs.Post
{
    public class PostUpdateRequest
    {
        public Guid? PostId { get; set; }
        public string? Title { get; set; }
        public string? Content { get; set; }
        public string? ImagePath { get; set; }
    }
}
