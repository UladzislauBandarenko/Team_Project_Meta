﻿namespace Team_Project_Meta.DTOs.Users
{
    public class PasswordResetConfirmDto
    {
        public string Email { get; set; } = string.Empty;
        public string Code { get; set; } = string.Empty;
        public string NewPassword { get; set; } = string.Empty;
    }
}
