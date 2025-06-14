using Microsoft.AspNetCore.Mvc;
using Team_Project_Meta.DTOs.CartItem;
using Team_Project_Meta.Services.CartItem;

namespace Team_Project_Meta.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
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
            var items = await _cartItemService.GetItemsByCartIdAsync(cartId);
            return Ok(items);
        }

        [HttpPost]
        public async Task<IActionResult> AddOrUpdateCartItem([FromBody] CreateCartItemDto dto)
        {
            var result = await _cartItemService.AddOrUpdateCartItemAsync(dto);
            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCartItem(int id, [FromBody] UpdateCartItemDto dto)
        {
            var success = await _cartItemService.UpdateCartItemAsync(id, dto);
            return success ? Ok() : NotFound();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCartItem(int id)
        {
            var success = await _cartItemService.DeleteCartItemAsync(id);
            return success ? Ok() : NotFound();
        }
    }
}
