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

        public async Task<IEnumerable<CartItemDto>> GetItemsByCartIdAsync(int cartId)
        {
            var items = await _context.CartItems
                .Where(i => i.CartId == cartId)
                .ToListAsync();

            return items.Select(i => new CartItemDto
            {
                Id = i.Id,
                CartId = i.CartId,
                ProductId = i.ProductId,
                Quantity = i.Quantity
            });
        }

        public async Task<CartItemDto> AddOrUpdateCartItemAsync(CreateCartItemDto dto)
        {
            var existing = await _context.CartItems
                .FirstOrDefaultAsync(i => i.CartId == dto.CartId && i.ProductId == dto.ProductId);

            if (existing != null)
            {
                existing.Quantity += dto.Quantity;
                _context.CartItems.Update(existing);
            }
            else
            {
                var newItem = new Models.CartItem
                {
                    CartId = dto.CartId,
                    ProductId = dto.ProductId,
                    Quantity = dto.Quantity
                };
                _context.CartItems.Add(newItem);
            }

            await _context.SaveChangesAsync();

            var item = await _context.CartItems
                .FirstOrDefaultAsync(i => i.CartId == dto.CartId && i.ProductId == dto.ProductId);

            return new CartItemDto
            {
                Id = item.Id,
                CartId = item.CartId,
                ProductId = item.ProductId,
                Quantity = item.Quantity
            };
        }

        public async Task<bool> UpdateCartItemAsync(int id, UpdateCartItemDto dto)
        {
            var item = await _context.CartItems.FindAsync(id);
            if (item == null) return false;

            item.Quantity = dto.Quantity;
            _context.CartItems.Update(item);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteCartItemAsync(int id)
        {
            var item = await _context.CartItems.FindAsync(id);
            if (item == null) return false;

            _context.CartItems.Remove(item);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
