using Microsoft.AspNetCore.Mvc;
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

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetCartByUserId(int userId)
        {
            var cart = await _cartService.GetCartByUserIdAsync(userId);
            if (cart == null) return NotFound();
            return Ok(cart);
        }

        [HttpPost]
        public async Task<IActionResult> CreateCart([FromBody] CreateCartDto dto)
        {
            var cart = await _cartService.CreateCartAsync(dto);
            return Ok(cart);
        }

        [HttpDelete("{cartId}")]
        public async Task<IActionResult> DeleteCart(int cartId)
        {
            var success = await _cartService.DeleteCartAsync(cartId);
            return success ? Ok() : NotFound();
        }
    }
}
