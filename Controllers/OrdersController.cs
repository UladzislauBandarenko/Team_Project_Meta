using Microsoft.AspNetCore.Mvc;
using Team_Project_Meta.DTOs.Order;
using Team_Project_Meta.Services.Order;


namespace Team_Project_Meta.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _service;

        public OrdersController(IOrderService service)
        {
            _service = service;
        }

        // Получить все заказы
        [HttpGet]
        public async Task<IActionResult> GetOrders()
        {
            var orders = await _service.GetOrdersAsync();
            return Ok(orders);
        }

        // Получить заказы по userId
        [HttpGet("by-user/{userId}")]
        public async Task<IActionResult> GetOrdersByUser(int userId)
        {
            var orders = await _service.GetOrdersByUserIdAsync(userId);
            return Ok(orders);
        }

        // Получить заказ по ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrder(int id)
        {
            var order = await _service.GetOrderByIdAsync(id);
            if (order == null) return NotFound();
            return Ok(order);
        }

        // Создать заказ
        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] CreateOrderDto dto)
        {
            var createdOrder = await _service.CreateOrderAsync(dto);
            return CreatedAtAction(nameof(GetOrder), new { id = createdOrder.Id }, createdOrder);
        }

        // Обновить заказ
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOrder(int id, [FromBody] UpdateOrderDto dto)
        {
            var updated = await _service.UpdateOrderAsync(id, dto);
            if (!updated) return NotFound();
            return NoContent();
        }

        // Удалить заказ
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var deleted = await _service.DeleteOrderAsync(id);
            if (!deleted) return NotFound();
            return NoContent();
        }
    }
}
