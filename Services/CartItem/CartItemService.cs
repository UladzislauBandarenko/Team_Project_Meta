using Microsoft.EntityFrameworkCore;
using Team_Project_Meta.Data;
using Team_Project_Meta.DTOs.CartItem;
using Team_Project_Meta.Models;

namespace Team_Project_Meta.Services.CartItem
{
    public class CartItemService : ICartItemService
    {
        private readonly AppDbContext _context;

        public CartItemService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<int> GetOrCreateUserCartIdAsync(int userId)
        {
            var cart = await _context.Carts.FirstOrDefaultAsync(c => c.UserId == userId);
            if (cart != null)
                return cart.Id;

            var newCart = new Models.Cart
            {
                UserId = userId,
                CreatedDate = DateTime.UtcNow
            };

            _context.Carts.Add(newCart);
            await _context.SaveChangesAsync();
            return newCart.Id;
        }

        public async Task<IEnumerable<CartItemDto>> GetItemsByCartIdAsync(int cartId)
        {
            var items = await _context.CartItems
                .Where(i => i.CartId == cartId)
                .ToListAsync();

            var productIds = items.Select(i => i.ProductId).Distinct().ToList();

            var products = await _context.Products
                .Where(p => productIds.Contains(p.Id))
                .ToDictionaryAsync(p => p.Id, p => new
                {
                    p.Price,
                    p.ImageData,
                    p.ProductName
                });

            return items.Select(i =>
            {
                products.TryGetValue(i.ProductId, out var productData);

                string? base64Image = productData?.ImageData != null ? Convert.ToBase64String(productData.ImageData) : null;

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
            });
        }

        public async Task<CartItemDto> AddOrUpdateCartItemAsync(CreateCartItemDto dto, int userId)
        {
            // Найти корзину пользователя
            var cart = await _context.Carts.FirstOrDefaultAsync(c => c.UserId == userId);

            // Если корзины нет — создаём новую
            if (cart == null)
            {
                cart = new Models.Cart { UserId = userId };
                _context.Carts.Add(cart);
                await _context.SaveChangesAsync();
            }

            var existing = await _context.CartItems
                .FirstOrDefaultAsync(i => i.CartId == cart.Id && i.ProductId == dto.ProductId);

            if (existing != null)
            {
                existing.Quantity += dto.Quantity;
                existing.IsSelected = dto.IsSelected;
                _context.CartItems.Update(existing);
            }
            else
            {
                var newItem = new Models.CartItem
                {
                    CartId = cart.Id,
                    ProductId = dto.ProductId,
                    Quantity = dto.Quantity,
                    IsSelected = dto.IsSelected
                };
                _context.CartItems.Add(newItem);
            }

            await _context.SaveChangesAsync();

            var item = await _context.CartItems
                .FirstOrDefaultAsync(i => i.CartId == cart.Id && i.ProductId == dto.ProductId);

            return new CartItemDto
            {
                Id = item.Id,
                CartId = item.CartId,
                ProductId = item.ProductId,
                Quantity = item.Quantity,
                IsSelected = item.IsSelected
            };
        }


        public async Task<bool> UpdateCartItemAsync(int cartId, int itemId, int userId, UpdateCartItemDto dto)
        {
            var cart = await _context.Carts.FirstOrDefaultAsync(c => c.Id == cartId && c.UserId == userId);
            if (cart == null)
                return false;

            var cartItem = await _context.CartItems.FirstOrDefaultAsync(ci => ci.Id == itemId && ci.CartId == cartId);
            if (cartItem == null)
                return false;

            if (dto.Quantity.HasValue)
                cartItem.Quantity = dto.Quantity.Value;

            cartItem.IsSelected = dto.IsSelected;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteCartItemAsync(int id, int userId)
        {
            var item = await _context.CartItems
                .Include(ci => ci.Cart)
                .FirstOrDefaultAsync(ci => ci.Id == id && ci.Cart.UserId == userId);

            if (item == null) return false;

            _context.CartItems.Remove(item);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
