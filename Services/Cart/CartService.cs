using Microsoft.EntityFrameworkCore;
using Team_Project_Meta.Data;
using Team_Project_Meta.DTOs.Cart;
using Team_Project_Meta.DTOs.CartItem;
using Team_Project_Meta.Models;

namespace Team_Project_Meta.Services.Cart
{
    public class CartService : ICartService
    {
        private readonly AppDbContext _context;

        public CartService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<CartDto?> GetCartByUserIdAsync(int userId)
        {
            var cart = await _context.Carts
                .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null) return null;

            var items = await _context.CartItems
                .Where(ci => ci.CartId == cart.Id)
                .ToListAsync();

            return MapCartToDto(cart, items);
        }

        public async Task<CartDto> CreateCartAsync(int userId, CreateCartDto dto)
        {
            var existing = await _context.Carts
                .FirstOrDefaultAsync(c => c.UserId == userId);

            if (existing != null)
            {
                var existingItems = await _context.CartItems
                    .Where(ci => ci.CartId == existing.Id)
                    .ToListAsync();

                return MapCartToDto(existing, existingItems);
            }

            var cart = new Models.Cart
            {
                UserId = userId,
                CreatedDate = DateTime.UtcNow,
                LastUpdatedDate = DateTime.UtcNow
            };

            _context.Carts.Add(cart);
            await _context.SaveChangesAsync(); // Чтобы получить cart.Id

            if (dto.Items != null && dto.Items.Any())
            {
                var cartItems = dto.Items.Select(i => new Models.CartItem
                {
                    CartId = cart.Id,
                    ProductId = i.ProductId,
                    Quantity = i.Quantity,
                    IsSelected = i.IsSelected
                }).ToList();

                _context.CartItems.AddRange(cartItems);
                await _context.SaveChangesAsync();
            }

            var createdItems = await _context.CartItems
                .Where(ci => ci.CartId == cart.Id)
                .ToListAsync();

            return MapCartToDto(cart, createdItems);
        }

        public async Task<bool> DeleteCartAsync(int cartId)
        {
            var cart = await _context.Carts.FindAsync(cartId);
            if (cart == null) return false;

            _context.Carts.Remove(cart);
            await _context.SaveChangesAsync();

            return true;
        }

        private CartDto MapCartToDto(Models.Cart cart, List<Models.CartItem> items)
        {
            var productIds = items.Select(i => i.ProductId).Distinct().ToList();

            // Fetch all relevant products with needed data: Price, ImageData, ProductName
            var products = _context.Products
                .Where(p => productIds.Contains(p.Id))
                .ToDictionary(p => p.Id, p => new
                {
                    p.Price,
                    p.ImageData,
                    p.ProductName
                });

            return new CartDto
            {
                Id = cart.Id,
                UserId = cart.UserId,
                CreatedDate = cart.CreatedDate,
                LastUpdatedDate = cart.LastUpdatedDate,
                Items = items.Select(i =>
                {
                    products.TryGetValue(i.ProductId, out var productData);

                    // Convert ImageData (byte[]) to Base64 string
                    string? base64Image = productData?.ImageData != null ? Convert.ToBase64String(productData.ImageData): null;

                    return new CartItemDto
                    {
                        Id = i.Id,
                        CartId = i.CartId,
                        ProductId = i.ProductId,
                        Quantity = i.Quantity,
                        IsSelected = i.IsSelected,
                        Price = productData?.Price ?? 0,
                        ImageBase64 = base64Image,
                        ProductName = productData?.ProductName
                    };
                }).ToList()
            };
        }
    }
}
