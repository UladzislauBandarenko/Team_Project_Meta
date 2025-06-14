using Microsoft.EntityFrameworkCore;
using Team_Project_Meta.Data;
using Team_Project_Meta.DTOs.Order;
using Team_Project_Meta.Models;


namespace Team_Project_Meta.Services.Order
{
    public class OrderService : IOrderService
    {
        private readonly AppDbContext _context;

        public OrderService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<OrderDto>> GetOrdersAsync()
        {
            var orders = await _context.Orders.ToListAsync();
            return orders.Select(MapOrderToDto);
        }

        public async Task<IEnumerable<OrderDto>> GetOrdersByUserIdAsync(int userId)
        {
            var orders = await _context.Orders
                .Where(o => o.UserId == userId)
                .ToListAsync();

            return orders.Select(MapOrderToDto);
        }

        public async Task<OrderDto?> GetOrderByIdAsync(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            return order == null ? null : MapOrderToDto(order);
        }

        public async Task<OrderDto> CreateOrderAsync(CreateOrderDto dto)
        {
            var order = new Models.Order
            {
                UserId = dto.UserId,
                DeliveryServiceId = dto.DeliveryServiceId,
                TotalPrice = dto.TotalPrice,
                Status = dto.Status ?? "pending",
                CreatedDate = DateTime.UtcNow,
                LastUpdatedDate = DateTime.UtcNow
            };

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return MapOrderToDto(order);
        }

        public async Task<bool> UpdateOrderAsync(int id, UpdateOrderDto dto)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null) return false;

            order.DeliveryServiceId = dto.DeliveryServiceId;
            order.TrackingNumber = dto.TrackingNumber;
            order.Status = dto.Status;
            order.TotalPrice = dto.TotalPrice;
            order.LastUpdatedDate = DateTime.UtcNow;

            _context.Orders.Update(order);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteOrderAsync(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null) return false;

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return true;
        }

        private static OrderDto MapOrderToDto(Models.Order o)
        {
            return new OrderDto
            {
                Id = o.Id,
                UserId = o.UserId,
                DeliveryServiceId = o.DeliveryServiceId,
                TotalPrice = o.TotalPrice,
                TrackingNumber = o.TrackingNumber,
                Status = o.Status,
                CreatedDate = o.CreatedDate,
                LastUpdatedDate = o.LastUpdatedDate
            };
        }
    }
}
