using Microsoft.EntityFrameworkCore;
using Team_Project_Meta.Data;
using Team_Project_Meta.DTOs.Order;
using Team_Project_Meta.DTOs.OrderItem;
using Team_Project_Meta.Models;
using Team_Project_Meta.Services.Users;
using Team_Project_Meta.Services.DeliveryServices;

namespace Team_Project_Meta.Services.Order
{
    public class OrderService : IOrderService
    {
        private readonly AppDbContext _context;
        private readonly DeliveryServicesService _deliveryservices;
        private readonly UsersService _usersService;

        public OrderService(AppDbContext context, DeliveryServicesService deliveryservices, UsersService usersService)
        {
            _context = context;
            _deliveryservices = deliveryservices;
            _usersService = usersService;
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

        public async Task<OrderDto> CreateOrderAsync(CreateOrderDto dto, int userId, bool SaveShiping)
        {
            var trackingNumber = _deliveryservices.GetDeliveryServiceCode(dto.DeliveryServiceId);
            var order = new Models.Order
            {
                UserId = userId,
                DeliveryServiceId = dto.DeliveryServiceId,
                TotalPrice = dto.TotalPrice,
                TrackingNumber = trackingNumber,
                Status = dto.Status ?? "pending",
                Address = dto.Address,
                City = dto.City,
                PostalCode = dto.PostalCode,
                Country = dto.Country,
                PhoneNumber = dto.PhoneNumber,
                ApartmentNumber = dto.ApartmentNumber,
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

            var cart = await _context.Carts
                .FirstOrDefaultAsync(c => c.UserId == userId);
            if (cart != null)
            {
                _context.Carts.Remove(cart);
                await _context.SaveChangesAsync();
            }
            if (SaveShiping)
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
                if (user != null)
                {
                    user.Address = dto.Address;
                    user.City = dto.City;
                    user.PostalCode = dto.PostalCode;
                    user.Country = dto.Country;
                    user.PhoneNumber = dto.PhoneNumber;
                    user.ApartmentNumber = dto.ApartmentNumber;
                    _context.Users.Update(user);
                    await _context.SaveChangesAsync();
                }
            }


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
                Address = o.Address,
                City = o.City,
                PostalCode = o.PostalCode,
                Country = o.Country,
                PhoneNumber = o.PhoneNumber,
                ApartmentNumber = o.ApartmentNumber,

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

