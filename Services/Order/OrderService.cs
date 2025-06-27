using Microsoft.EntityFrameworkCore;
using Team_Project_Meta.Data;
using Team_Project_Meta.DTOs.Order;
using Team_Project_Meta.DTOs.OrderItem;
using Team_Project_Meta.Models;
using Team_Project_Meta.Services.Users;
using Team_Project_Meta.Services.DeliveryServices;
using Team_Project_Meta.Services.Notification;

namespace Team_Project_Meta.Services.Order
{
    public class OrderService : IOrderService
    {
        private readonly AppDbContext _context;
        private readonly DeliveryServicesService _deliveryservices;
        private readonly UsersService _usersService;
        private readonly INotificationService _notificationService;

        public OrderService(AppDbContext context, DeliveryServicesService deliveryservices, UsersService usersService, INotificationService notificationService)
        {
            _context = context;
            _deliveryservices = deliveryservices;
            _usersService = usersService;
            _notificationService = notificationService;
        }

        public async Task<IEnumerable<OrderDto>> GetOrdersAsync()
        {
            var orders = await _context.Orders.ToListAsync();
            var orderIds = orders.Select(o => o.Id).ToList();

            var orderItems = await _context.OrderItems
                .Where(oi => orderIds.Contains(oi.OrderId))
                .Include(oi => oi.Product)
                .ToListAsync();

            var userIds = orders.Select(o => o.UserId).Distinct().ToList();
            var users = await _context.Users
                .Where(u => userIds.Contains(u.Id))
                .ToListAsync();

            return orders.Select(o =>
            {
                var user = users.FirstOrDefault(u => u.Id == o.UserId);
                return MapOrderToDto(o, orderItems.Where(oi => oi.OrderId == o.Id), user);
            }).ToList();
        }

        public async Task<IEnumerable<OrderDto>> GetOrdersByUserIdAsync(int userId)
        {
            var orders = await _context.Orders
                .Where(o => o.UserId == userId)
                .ToListAsync();

            var orderIds = orders.Select(o => o.Id).ToList();

            var orderItems = await _context.OrderItems
                .Where(oi => orderIds.Contains(oi.OrderId))
                .Include(oi => oi.Product)
                .ToListAsync();

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);

            return orders.Select(o => MapOrderToDto(o, orderItems.Where(oi => oi.OrderId == o.Id), user)).ToList();
        }

        public async Task<OrderDto?> GetOrderByIdAsync(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null) return null;

            var orderItems = await _context.OrderItems
                .Where(oi => oi.OrderId == id)
                .Include(oi => oi.Product)
                .ToListAsync();

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == order.UserId);

            return MapOrderToDto(order, orderItems, user);
        }

        public async Task<IEnumerable<OrderDto>> GetOrdersBySellerIdAsync(int sellerId)
        {
            var orders = await _context.Orders
                .Include(o => o.OrderItems!)
                    .ThenInclude(oi => oi.Product)
                .Where(o => o.OrderItems!.Any(oi => oi.Product != null && oi.Product.SellerId == sellerId))
                .ToListAsync();

            var userIds = orders.Select(o => o.UserId).Distinct().ToList();
            var users = await _context.Users
                .Where(u => userIds.Contains(u.Id))
                .ToListAsync();

            var result = orders.Select(order =>
            {
                var user = users.FirstOrDefault(u => u.Id == order.UserId);
                return MapOrderToDto(
                    order,
                    order.OrderItems!.Where(oi => oi.Product != null && oi.Product.SellerId == sellerId),
                    user
                );
            });

            return result;
        }

        public async Task<OrderDto> CreateOrderAsync(CreateOrderDto dto, int userId, bool SaveShipping)
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
                .Include(oi => oi.Product)
                .ToListAsync();

            var cart = await _context.Carts.FirstOrDefaultAsync(c => c.UserId == userId);
            if (cart != null)
            {
                _context.Carts.Remove(cart);
                await _context.SaveChangesAsync();
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);

            if (SaveShipping && user != null)
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

            await NotifyBuyerAsync(order, userId);
            await NotifySellersAsync(order.Id);

            return MapOrderToDto(order, createdOrderItems, user);
        }

        public async Task<bool> DeleteOrderAsync(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null) return false;

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return true;
        }

        private static OrderDto MapOrderToDto(Models.Order o, IEnumerable<Models.OrderItem>? orderItems, User? user = null)
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
                FirstName = user?.FirstName,
                LastName = user?.LastName,
                OrderItems = orderItems?.Select(oi => new OrderItemDto
                {
                    Id = oi.Id,
                    OrderId = oi.OrderId,
                    ProductId = oi.ProductId,
                    Quantity = oi.Quantity,
                    Price = oi.Price,
                    ProductName = oi.Product?.ProductName,
                    ImageBase64 = oi.Product?.ImageData != null
                        ? Convert.ToBase64String(oi.Product.ImageData)
                        : null
                }).ToList() ?? new List<OrderItemDto>()
            };
        }

        private async Task NotifyBuyerAsync(Models.Order order, int userId)
        {
            var userEmail = (await _context.Users.FirstOrDefaultAsync(u => u.Id == userId))?.Email;

            if (!string.IsNullOrEmpty(userEmail))
            {
                var subject = "Your Order Has Been Created";
                var body = $"<h2>Thank you for your order!</h2><p>Tracking Number: {order.TrackingNumber}</p>";
                await _notificationService.SendEmailAsync(userEmail, subject, body);
            }
        }

        private async Task NotifySellersAsync(int orderId)
        {
            var orderItems = await _context.OrderItems
                .Where(oi => oi.OrderId == orderId)
                .ToListAsync();

            var productIds = orderItems.Select(oi => oi.ProductId).ToList();

            var productsWithSellers = await _context.Products
                .Where(p => productIds.Contains(p.Id))
                .Select(p => new { p.Id, p.ProductName, p.SellerId })
                .ToListAsync();

            var sellerIds = productsWithSellers.Select(p => p.SellerId).Distinct().ToList();

            var sellers = await _context.Users
                .Where(u => sellerIds.Contains(u.Id))
                .Select(u => new { u.Id, u.Email })
                .ToListAsync();

            foreach (var seller in sellers)
            {
                if (!string.IsNullOrEmpty(seller.Email))
                {
                    var sellerProductNames = productsWithSellers
                        .Where(p => p.SellerId == seller.Id)
                        .Select(p => p.ProductName);

                    var subject = "Your product(s) were ordered!";
                    var body = $"<h3>Congratulations!</h3><p>The following product(s) were ordered:</p><ul>";
                    foreach (var name in sellerProductNames)
                        body += $"<li>{name}</li>";
                    body += "</ul>";

                    await _notificationService.SendEmailAsync(seller.Email, subject, body);
                }
            }
        }
    }
}
