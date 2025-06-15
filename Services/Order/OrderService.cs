using Microsoft.EntityFrameworkCore;
using Team_Project_Meta.Data;
using Team_Project_Meta.DTOs.Order;
using Team_Project_Meta.DTOs.OrderItem;
using Team_Project_Meta.Models;
using Team_Project_Meta.Services.DeliveryServices;

namespace Team_Project_Meta.Services.Order
{
    public class OrderService : IOrderService
    {
        private readonly AppDbContext _context;
        private readonly DeliveryServicesService _deliveryservices;

        public OrderService(AppDbContext context, DeliveryServicesService deliveryservices)
        {
            _context = context;
            _deliveryservices = deliveryservices;
        }

        public async Task<IEnumerable<OrderDto>> GetOrdersAsync()
        {
            var orders = await _context.Orders.ToListAsync();

            // Load order items for all orders in one query for efficiency
            var orderIds = orders.Select(o => o.Id).ToList();

            var orderItems = await _context.OrderItems
                .Where(oi => orderIds.Contains(oi.OrderId))
                .ToListAsync();

            return orders.Select(o => MapOrderToDto(o, orderItems.Where(oi => oi.OrderId == o.Id))).ToList();
        }

        public async Task<IEnumerable<OrderDto>> GetOrdersByUserIdAsync(int userId)
        {
            var orders = await _context.Orders
                .Where(o => o.UserId == userId)
                .ToListAsync();

            var orderIds = orders.Select(o => o.Id).ToList();

            var orderItems = await _context.OrderItems
                .Where(oi => orderIds.Contains(oi.OrderId))
                .ToListAsync();

            return orders.Select(o => MapOrderToDto(o, orderItems.Where(oi => oi.OrderId == o.Id))).ToList();
        }

        public async Task<OrderDto?> GetOrderByIdAsync(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null) return null;

            var orderItems = await _context.OrderItems
                .Where(oi => oi.OrderId == id)
                .ToListAsync();

            return MapOrderToDto(order, orderItems);
        }

        public async Task<OrderDto> CreateOrderAsync(CreateOrderDto dto, int userId)
        {
            var trackingNumber = _deliveryservices.GetDeliveryServiceCode(dto.DeliveryServiceId);
            var order = new Models.Order
            {
                UserId = userId,
                DeliveryServiceId = dto.DeliveryServiceId,
                TotalPrice = dto.TotalPrice,
                TrackingNumber = trackingNumber,
                Status = dto.Status ?? "pending",
                CreatedDate = DateTime.UtcNow,
                LastUpdatedDate = DateTime.UtcNow
            };

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            if (dto.OrderItems != null && dto.OrderItems.Any())
            {
                var orderItems = dto.OrderItems.Select(itemDto => new Models.OrderItem
                {
                    OrderId = order.Id,
                    ProductId = itemDto.ProductId,
                    Quantity = itemDto.Quantity,
                    Price = itemDto.Price
                }).ToList();

                _context.OrderItems.AddRange(orderItems);
                await _context.SaveChangesAsync();
            }

            var createdOrderItems = await _context.OrderItems
                .Where(oi => oi.OrderId == order.Id)
                .ToListAsync();

            return MapOrderToDto(order, createdOrderItems);
        }

        public async Task<bool> DeleteOrderAsync(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null) return false;

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return true;
        }
        private static OrderDto MapOrderToDto(Models.Order o, IEnumerable<Models.OrderItem>? orderItems)
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
                LastUpdatedDate = o.LastUpdatedDate,

                OrderItems = orderItems?.Select(oi => new OrderItemDto
                {
                    Id = oi.Id,
                    OrderId = oi.OrderId,
                    ProductId = oi.ProductId,
                    Quantity = oi.Quantity,
                    Price = oi.Price
                }).ToList() ?? new List<OrderItemDto>()
            };
        }
    }
}

