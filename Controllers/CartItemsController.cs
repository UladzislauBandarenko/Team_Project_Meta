using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Team_Project_Meta.DTOs.CartItem;
using Team_Project_Meta.Services.CartItem;

namespace Team_Project_Meta.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "buyer")]
    public class CartItemsController : ControllerBase
    {
        private readonly ICartItemService _cartItemService;

        public CartItemsController(ICartItemService cartItemService)
        {
            _cartItemService = cartItemService;
        }

        [HttpGet("cart/{cartId}")]
        public async Task<IActionResult> GetItemsByCartId(int cartId)
        {
            int userId = GetUserIdFromClaims();

            // Проверяем, что корзина принадлежит пользователю
            if (!await _cartItemService.IsCartOwnedByUserAsync(cartId, userId))
                return Forbid("Access denied to this cart.");

            var items = await _cartItemService.GetItemsByCartIdAsync(cartId);
            return Ok(items);
        }

        [HttpPost]
        public async Task<IActionResult> AddOrUpdateCartItem([FromBody] CreateCartItemDto dto)
        {
            int userId = GetUserIdFromClaims();

            // Проверяем, что корзина принадлежит пользователю
            if (!await _cartItemService.IsCartOwnedByUserAsync(dto.CartId, userId))
                return Forbid("Access denied to this cart.");

            var result = await _cartItemService.AddOrUpdateCartItemAsync(dto, userId);

            if (result == null)
                return BadRequest("Invalid cart or you don't have permission.");

            return Ok(result);
        }

        [HttpPut("{cartId}/items/{itemId}")]
        public async Task<IActionResult> UpdateCartItem(int cartId, int itemId, [FromBody] UpdateCartItemDto dto)
        {
            int userId = GetUserIdFromClaims();

            var updated = await _cartItemService.UpdateCartItemAsync(cartId, itemId, userId, dto);

            if (!updated)
                return NotFound("Cart item not found or access denied.");

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCartItem(int id)
        {
            int userId = GetUserIdFromClaims();

            var deleted = await _cartItemService.DeleteCartItemAsync(id, userId);

            if (!deleted)
                return NotFound("Cart item not found or access denied.");

            return NoContent();
        }

        private int GetUserIdFromClaims()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
                throw new UnauthorizedAccessException("User ID claim is missing or invalid.");
            return userId;
        }
    }
}
