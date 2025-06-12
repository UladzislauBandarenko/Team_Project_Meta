using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Team_Project_Meta.Data;
using Team_Project_Meta.DTOs.Users;
using Team_Project_Meta.Models;
using Microsoft.Extensions.Configuration;
using Team_Project_Meta.Helpers;
using BCrypt.Net;

namespace Team_Project_Meta.Services.Users
{
    public class UsersService : IUsersService
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _config;

        public UsersService(AppDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        public async Task<IEnumerable<UserDto>> GetAllUsersAsync()
        {
            var users = await _context.Users.ToListAsync();
            return users.Select(u => new UserDto
            {
                Id = u.Id,
                FirstName = u.FirstName!,
                LastName = u.LastName!,
                Email = u.Email!,
                Role = u.Role!
            });
        }

        public async Task<UserDto?> GetUserByIdAsync(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return null;

            return new UserDto
            {
                Id = user.Id,
                FirstName = user.FirstName!,
                LastName = user.LastName!,
                Email = user.Email!,
                Role = user.Role!
            };
        }

        public async Task<UserDto?> RegisterUserAsync(UserRegisterDto dto)
        {
            var user = new User
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Email = dto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Role = "buyer",
                CreatedDate = DateTime.UtcNow,
                LastUpdatedDate = DateTime.UtcNow
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return new UserDto
            {
                Id = user.Id,
                FirstName = user.FirstName!,
                LastName = user.LastName!,
                Email = user.Email!,
                Role = user.Role!
            };
        }

        public async Task<AuthResponseDto?> LoginUserAsync(UserLoginDto dto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);

            Console.WriteLine($"DTO password: {dto.Password}");
            Console.WriteLine($"User hash: {user.PasswordHash}");
            Console.WriteLine($"Match: {BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash)}");

            if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
                return null;

            var jwt = JwtTokenGenerator.GenerateToken(user, _config);

            return new AuthResponseDto
            {
                Token = jwt,
                User = new UserDto
                {
                    Id = user.Id,
                    FirstName = user.FirstName!,
                    LastName = user.LastName!,
                    Email = user.Email!,
                    Role = user.Role!
                }
            };
        }
    }
}
