using Microsoft.EntityFrameworkCore;
using Team_Project_Meta.Data;
using Team_Project_Meta.DTOs.Cart;
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

            return new CartDto
            {
                Id = cart.Id,
                UserId = cart.UserId,
                CreatedDate = cart.CreatedDate,
                LastUpdatedDate = cart.LastUpdatedDate
            };
        }

        public async Task<CartDto> CreateCartAsync(CreateCartDto dto)
        {
            var existing = await _context.Carts
                .FirstOrDefaultAsync(c => c.UserId == dto.UserId);

            if (existing != null)
            {
                return new CartDto
                {
                    Id = existing.Id,
                    UserId = existing.UserId,
                    CreatedDate = existing.CreatedDate,
                    LastUpdatedDate = existing.LastUpdatedDate
                };
            }

            var cart = new Models.Cart
            {
                UserId = dto.UserId,
                CreatedDate = DateTime.UtcNow,
                LastUpdatedDate = DateTime.UtcNow
            };

            _context.Carts.Add(cart);
            await _context.SaveChangesAsync();

            return new CartDto
            {
                Id = cart.Id,
                UserId = cart.UserId,
                CreatedDate = cart.CreatedDate,
                LastUpdatedDate = cart.LastUpdatedDate
            };
        }

        public async Task<bool> DeleteCartAsync(int cartId)
        {
            var cart = await _context.Carts.FindAsync(cartId);
            if (cart == null) return false;

            _context.Carts.Remove(cart);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
