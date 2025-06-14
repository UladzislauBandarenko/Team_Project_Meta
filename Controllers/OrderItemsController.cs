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

        [HttpGet("order/{orderId}")]
        public async Task<ActionResult<IEnumerable<OrderItemDto>>> GetByOrder(int orderId)
        {
            var items = await _service.GetItemsByOrderIdAsync(orderId);
            return Ok(items);
        }

        [HttpPost]
        public async Task<ActionResult<OrderItemDto>> Add(CreateOrderItemDto dto)
        {
            var item = await _service.AddOrderItemAsync(dto);
            return Ok(item);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var success = await _service.DeleteOrderItemAsync(id);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}
