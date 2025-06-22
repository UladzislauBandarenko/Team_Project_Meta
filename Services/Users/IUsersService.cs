using Team_Project_Meta.DTOs.Users;

namespace Team_Project_Meta.Services.Users
{
    public interface IUsersService
    {
        Task<IEnumerable<UserDto>> GetAllUsersAsync();
        Task<UserDto?> GetUserByIdAsync(int id);
        Task<UserDto?> RegisterUserAsync(UserRegisterDto dto);
        Task<AuthResponseDto?> LoginUserAsync(UserLoginDto dto);
        Task<bool> UpdateUserAsync(int id, UserUpdateDto dto);
        Task<AuthResponseDto?> RegisterAndLoginAsync(UserRegisterDto dto);
        Task<AuthResponseDto?> RefreshTokenAsync(string refreshToken);
        Task<bool> RequestPasswordResetAsync(string email);
        Task<bool> ResetPasswordWithCodeAsync(string email, string code, string newPassword);
        Task<AuthResponseDto?> RegisterSellerAsync(SellerRegisterDto dto);
        Task<bool> PromoteUserAsync(PromoteUserDto dto);
    }
}
