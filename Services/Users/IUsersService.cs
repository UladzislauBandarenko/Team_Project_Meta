using Team_Project_Meta.DTOs.Users;

namespace Team_Project_Meta.Services.Users
{
    public interface IUsersService
    {
        Task<IEnumerable<UserDto>> GetAllUsersAsync();
        Task<UserDto?> GetUserByIdAsync(int id);
        Task<UserDto?> RegisterUserAsync(UserRegisterDto dto);
        Task<AuthResponseDto?> LoginUserAsync(UserLoginDto dto);
    }
}
