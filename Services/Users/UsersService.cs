using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Team_Project_Meta.Data;
using Team_Project_Meta.DTOs.Users;
using Team_Project_Meta.Models;
using Microsoft.Extensions.Configuration;
using Team_Project_Meta.Helpers;
using BCrypt.Net;
using Team_Project_Meta.DTOs.CartItem;

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
                Role = u.Role!,
                Address = u.Address!,
                City = u.City!,
                PostalCode = u.PostalCode!,
                Country = u.Country!,
                PhoneNumber = u.PhoneNumber!,
                ApartmentNumber = u.ApartmentNumber!

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
                Role = user.Role!,
                Address = user.Address!,
                City = user.City!,
                PostalCode = user.PostalCode!,
                Country = user.Country!,
                PhoneNumber = user.PhoneNumber!,
                ApartmentNumber = user.ApartmentNumber!
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
        public async Task<bool> UpdateUserAsync( int id, UserUpdateDto dto)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Id == id);
            if (user == null)
                return false;

            if (dto.FirstName != null )
                user.FirstName = dto.FirstName;
            if (dto.LastName != null)
                user.LastName = dto.LastName;
            if (dto.Address != null)
                user.Address = dto.Address;
            if (dto.City != null)
                user.City = dto.City;
            if (dto.PostalCode != null)
                user.PostalCode = dto.PostalCode;
            if (dto.Country != null)
                user.Country = dto.Country;
            if (dto.PhoneNumber != null)
                user.PhoneNumber = dto.PhoneNumber;
            if (dto.ApartmentNumber != null)
                user.ApartmentNumber = dto.ApartmentNumber;

            await _context.SaveChangesAsync();

            return true;
        }
    }
}
