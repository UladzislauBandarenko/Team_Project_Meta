using BCrypt.Net;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Collections.Concurrent;
using System.Security.Claims;
using System.Threading.Tasks;
using Team_Project_Meta.Data;
using Team_Project_Meta.DTOs.CartItem;
using Team_Project_Meta.DTOs.Users;
using Team_Project_Meta.Helpers;
using Team_Project_Meta.Models;
using Team_Project_Meta.Services.Auth;
using Team_Project_Meta.Services.Notification;

namespace Team_Project_Meta.Services.Users
{
    public class UsersService : IUsersService
    {
        private static readonly ConcurrentDictionary<string, (string Code, DateTime Expiry)> _resetCodes = new();
        private readonly AppDbContext _context;
        private readonly IConfiguration _config;
        private readonly JwtService _jwtService;
        private readonly INotificationService _notificationService;

        public UsersService(AppDbContext context, IConfiguration config, JwtService jwtService, INotificationService notificationService)
        {
            _context = context;
            _config = config;
            _jwtService = jwtService;
            _notificationService = notificationService;
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

            //Console.WriteLine($"DTO password: {dto.Password}");
            //Console.WriteLine($"User hash: {user.PasswordHash}");
            //Console.WriteLine($"Match: {BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash)}");

            if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
                return null;

            var jwt = JwtTokenGenerator.GenerateToken(user, _config);

            return new AuthResponseDto
            {
                Token = jwt,
                RefreshToken = _jwtService.GenerateRefreshToken(user),
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

        public async Task<AuthResponseDto?> RegisterAndLoginAsync(UserRegisterDto dto)
        {
            var existing = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
            if (existing != null) return null;

            var user = new User
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Email = dto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Role = "buyer",
                CreatedDate = DateTime.UtcNow
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var token = _jwtService.GenerateToken(user);
            // Send welcome email
            var subject = "Welcome to Pet Shop!";
            var body = $@"
                <h2>Welcome, {dto.FirstName}!</h2>
                <p>Thanks for registering with us. We're glad to have you on board.</p>
                <p>Feel free to browse our store and place your first order.</p>
                <p>– The Pet Shop Team</p>";
            await _notificationService.SendEmailAsync(user.Email, subject, body);

            return new AuthResponseDto
            {
                Token = token,
                User = new UserDto
                {
                    Id = user.Id,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Email = user.Email,
                    Role = user.Role,
                    Address = user.Address,
                    City = user.City,
                    PostalCode = user.PostalCode,
                    Country = user.Country,
                    PhoneNumber = user.PhoneNumber,
                    ApartmentNumber = user.ApartmentNumber
                }
            };
        }
        public async Task<AuthResponseDto?> RefreshTokenAsync(string refreshToken)
        {
            var principal = _jwtService.GetPrincipalFromExpiredToken(refreshToken);
            if (principal == null)
                return null;

            var userIdClaim = principal.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
                return null;

            if (!int.TryParse(userIdClaim.Value, out int userId))
                return null;

            var user = await _context.Users.FindAsync(userId);
            if (user == null)
                return null;

            var newAccessToken = _jwtService.GenerateToken(user);
            var newRefreshToken = _jwtService.GenerateRefreshToken(user);

            return new AuthResponseDto
            {
                Token = newAccessToken,
                RefreshToken = newRefreshToken,
                User = new UserDto
                {
                    Id = user.Id,
                    FirstName = user.FirstName!,
                    LastName = user.LastName!,
                    Email = user.Email!,
                    Role = user.Role!,
                    Address = user.Address,
                    City = user.City,
                    PostalCode = user.PostalCode,
                    Country = user.Country,
                    PhoneNumber = user.PhoneNumber,
                    ApartmentNumber = user.ApartmentNumber
                }
            };
        }

        public async Task<bool> RequestPasswordResetAsync(string email)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null) return false;

            var code = new Random().Next(100000, 999999).ToString(); // 6-digit code
            var expiry = DateTime.UtcNow.AddMinutes(10);
            _resetCodes[email] = (code, expiry);

            var subject = "Your Password Reset Code";
            var body = $@"
                <p>Hello {user.FirstName},</p>
                <p>Your password reset code is: <strong>{code}</strong></p>
                <p>This code will expire in 10 minutes.</p>
                <p>If you didn't request a reset, please ignore this email.</p>";

            await _notificationService.SendEmailAsync(email, subject, body);

            return true;
        }

        public async Task<bool> ResetPasswordWithCodeAsync(string email, string code, string newPassword)
        {
            if (!_resetCodes.TryGetValue(email, out var entry))
                return false;

            if (entry.Code != code || entry.Expiry < DateTime.UtcNow)
                return false;

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null)
                return false;

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(newPassword);
            await _context.SaveChangesAsync();

            _resetCodes.TryRemove(email, out _); // Cleanup after use

            return true;
        }


    }
}
