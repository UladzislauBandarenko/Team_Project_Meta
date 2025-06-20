using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Team_Project_Meta.Data;
using Team_Project_Meta.DTOs.Users;
using Team_Project_Meta.Services.Auth;
using Team_Project_Meta.Services.Users;

namespace Team_Project_Meta.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUsersService _usersService;

        public UsersController(IUsersService usersService)
        {
            _usersService = usersService;
        }

        // GET: api/Users
        [HttpGet]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetAllUsers()
        {
            var users = await _usersService.GetAllUsersAsync();
            return Ok(users);
        }

        // GET: api/Users/me
        [HttpGet("me")]
        [Authorize(Roles = "admin, buyer, seller")]
        public async Task<ActionResult<UserDto>> GetMe()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized("User not found");
            var user = await _usersService.GetUserByIdAsync(int.Parse(userId));
            if (user == null) return NotFound("User not found");
            return Ok(user);
        }

        // GET: api/Users/
        [HttpGet("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult<UserDto>> GetUserById(int id)
        {
            var user = await _usersService.GetUserByIdAsync(id);
            if (user == null) return NotFound();
            return Ok(user);
        }

        // POST: api/Users/register
        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<ActionResult<AuthResponseDto>> Register([FromBody] UserRegisterDto dto)
        {
            var response = await _usersService.RegisterAndLoginAsync(dto);
            if (response == null) return BadRequest("Registration failed");
            return Ok(response);
        }

        // POST: api/Users/login
        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<ActionResult<AuthResponseDto>> Login([FromBody] UserLoginDto dto)
        {
            var response = await _usersService.LoginUserAsync(dto);
            if (response == null) return Unauthorized("Invalid credentials");
            return Ok(response);
        }

        // PUT: api/users/
        [HttpPut()]
        public async Task<IActionResult> UpdateUser([FromBody] UserUpdateDto dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized("User not found");
            var success = await _usersService.UpdateUserAsync(int.Parse(userId), dto);
            if (!success)
                return NotFound(new { message = "User not found." });

            return Ok(); // 204 - Successfully updated, no response body
        }
        // POST: api/Users/refresh-token
        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshRequestDto dto)
        {
            var result = await _usersService.RefreshTokenAsync(dto.RefreshToken);
            if (result == null)
                return Unauthorized("Invalid refresh token");

            return Ok(result);
        }

        [HttpPost("request-reset")]
        public async Task<IActionResult> RequestReset([FromBody] PasswordResetRequestDto dto)
        {
            var result = await _usersService.RequestPasswordResetAsync(dto.Email);
            return result ? Ok("Reset code sent") : NotFound("Email not found");
        }

        [HttpPost("confirm-reset")]
        public async Task<IActionResult> ConfirmReset([FromBody] PasswordResetConfirmDto dto)
        {
            var result = await _usersService.ResetPasswordWithCodeAsync(dto.Email, dto.Code, dto.NewPassword);
            return result ? Ok("Password changed successfully") : BadRequest("Invalid code or expired");
        }


    }
}
