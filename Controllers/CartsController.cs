using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Team_Project_Meta.DTOs.Cart;
using Team_Project_Meta.Services.Cart;

namespace Team_Project_Meta.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CartsController : ControllerBase
    {
        private readonly ICartService _cartService;

        public CartsController(ICartService cartService)
        {
            _cartService = cartService;
        }

        // Получить корзину текущего пользователя
        [HttpGet("me")]
        [Authorize(Roles = "buyer")]
        public async Task<IActionResult> GetMyCart()
        {
            int userId = GetUserIdFromToken();
            var cart = await _cartService.GetCartByUserIdAsync(userId);
            if (cart == null) return NotFound();
            return Ok(cart);
        }

        // Создать корзину для текущего пользователя
        [HttpPost]
        [Authorize(Roles = "buyer")]
        public async Task<IActionResult> CreateCart([FromBody] CreateCartDto dto)
        {
            int userId = GetUserIdFromToken();
            var cart = await _cartService.CreateCartAsync(userId, dto);
            return Ok(cart);
        }

        private int GetUserIdFromToken()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
                throw new UnauthorizedAccessException("Invalid user ID in token.");
            return userId;
        }
    }
}
