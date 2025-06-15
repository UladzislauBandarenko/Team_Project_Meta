using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Team_Project_Meta.DTOs.Order;
using Team_Project_Meta.Services.Order;

namespace Team_Project_Meta.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _service;

        public OrdersController(IOrderService service)
        {
            _service = service;
        }

        // 1. Все заказы - только admin
        [HttpGet]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> GetOrders()
        {
            var orders = await _service.GetOrdersAsync();
            return Ok(orders);
        }

        // 2. Заказы текущего пользователя (buyer)
        [HttpGet("me")]
        [Authorize(Roles = "buyer")]
        public async Task<IActionResult> GetMyOrders()
        {
            int userId = GetUserIdFromClaims();
            var orders = await _service.GetOrdersByUserIdAsync(userId);
            return Ok(orders);
        }

        // 3. Заказы пользователя по userId - только admin
        [HttpGet("by-user/{userId}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> GetOrdersByUser(int userId)
        {
            var orders = await _service.GetOrdersByUserIdAsync(userId);
            return Ok(orders);
        }

        // 4. Получить заказ по id - только admin или владелец с ролью buyer
        [HttpGet("{id}")]
        [Authorize(Roles = "buyer,admin")]
        public async Task<IActionResult> GetOrder(int id)
        {
            var order = await _service.GetOrderByIdAsync(id);
            if (order == null)
                return NotFound(new { message = "Order not found" });

            int userId = GetUserIdFromClaims();
            var role = User.FindFirst(ClaimTypes.Role)?.Value;

            if (role == "admin")
                return Ok(order);

            if (role == "buyer" && order.UserId == userId)
                return Ok(order);

            return Forbid();
        }

        // 5. Создать заказ - только buyer
        [HttpPost]
        [Authorize(Roles = "buyer")]
        public async Task<IActionResult> CreateOrder([FromBody] CreateOrderDto dto, bool SaveShiping)
        {
            int userId = GetUserIdFromClaims();

            var createdOrder = await _service.CreateOrderAsync(dto, userId, SaveShiping);

            return CreatedAtAction(nameof(GetOrder), new { id = createdOrder.Id }, createdOrder);
        }

        // 6. Удалить заказ - только admin
        [HttpDelete("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var deleted = await _service.DeleteOrderAsync(id);
            if (!deleted)
                return NotFound(new { message = "Order not found" });

            return Ok(new { message = "Order deleted successfully" });
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