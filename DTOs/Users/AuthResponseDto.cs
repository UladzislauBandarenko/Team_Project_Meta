namespace Team_Project_Meta.DTOs.Users
{
    public class AuthResponseDto
    {
        public string Token { get; set; } = string.Empty;
        public UserDto User { get; set; } = null!;
        public string RefreshToken { get; set; } = string.Empty;
    }
}
