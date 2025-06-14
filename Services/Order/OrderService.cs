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

        public async Task<OrderDto?> GetOrderByIdAsync(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null) return null;

            return new OrderDto
            {
                Id = order.Id,
                UserId = order.UserId,
                TotalPrice = order.TotalPrice,
                DeliveryServiceId = order.DeliveryServiceId,
                TrackingNumber = order.TrackingNumber,
                Status = order.Status,
                CreatedDate = order.CreatedDate,
                LastUpdatedDate = order.LastUpdatedDate
            };
        }

        public async Task<OrderDto> CreateOrderAsync(CreateOrderDto dto)
        {
            var order = new Models.Order
            {
                UserId = dto.UserId,
                TotalPrice = dto.TotalPrice,
                DeliveryServiceId = dto.DeliveryServiceId,
                TrackingNumber = dto.TrackingNumber,
                Status = dto.Status ?? "pending",
                CreatedDate = DateTime.UtcNow,
                LastUpdatedDate = DateTime.UtcNow
            };

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return new OrderDto
            {
                Id = order.Id,
                UserId = order.UserId,
                TotalPrice = order.TotalPrice,
                DeliveryServiceId = order.DeliveryServiceId,
                TrackingNumber = order.TrackingNumber,
                Status = order.Status,
                CreatedDate = order.CreatedDate,
                LastUpdatedDate = order.LastUpdatedDate
            };
        }

        public async Task<bool> DeleteOrderAsync(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null) return false;

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
