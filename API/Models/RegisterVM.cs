﻿using System.Text.Json.Serialization;

namespace GPBack.Models
{
    public class RegisterVM
    {
        public string Username { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string ConfirmPassword { get; set; }
    }
}
