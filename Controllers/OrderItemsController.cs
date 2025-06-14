using Microsoft.AspNetCore.Mvc;
using Team_Project_Meta.DTOs.OrderItem;
using Team_Project_Meta.Services.OrderItem;

namespace Team_Project_Meta.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderItemsController : ControllerBase
    {
        private readonly IOrderItemService _service;

        public OrderItemsController(IOrderItemService service)
        {
            _service = service;
        }

        [HttpGet("{orderId}")]
        public async Task<IActionResult> GetItemsByOrder(int orderId)
        {
            var items = await _service.GetItemsByOrderIdAsync(orderId);
            return Ok(items);
        }

        [HttpPost]
        public async Task<IActionResult> AddItem([FromBody] CreateOrderItemDto dto)
        {
            var createdItem = await _service.AddOrderItemAsync(dto);
            return CreatedAtAction(nameof(GetItemsByOrder), new { orderId = createdItem.OrderId }, createdItem);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateItem(int id, [FromBody] UpdateOrderItemDto dto)
        {
            var updated = await _service.UpdateOrderItemAsync(id, dto);
            if (!updated) return NotFound();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem(int id)
        {
            var deleted = await _service.DeleteOrderItemAsync(id);
            if (!deleted) return NotFound();
            return NoContent();
        }
    }
}
