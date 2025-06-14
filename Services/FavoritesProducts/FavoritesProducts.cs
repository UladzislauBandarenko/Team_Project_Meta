using Microsoft.EntityFrameworkCore;
using Team_Project_Meta.Data;
using Team_Project_Meta.DTOs.FavoritesProduct;
using Team_Project_Meta.Models;
using Team_Project_Meta.Services.FavoritesProducts;

public class FavoritesProductsService : IFavoritesProductsService
{
    private readonly AppDbContext _context;

    public FavoritesProductsService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<FavoritesProductDto>> GetAllAsync()
    {
        return await _context.FavoritesProducts
            .Select(f => new FavoritesProductDto
            {
                Id = f.Id,
                UserId = f.UserId,
                ProductId = f.ProductId,
                CreatedDate = f.CreatedDate
            }).ToListAsync();
    }

    public async Task<IEnumerable<FavoritesProductDto>> GetByUserIdAsync(int userId)
    {
        return await _context.FavoritesProducts
            .Where(f => f.UserId == userId)
            .Select(f => new FavoritesProductDto
            {
                Id = f.Id,
                UserId = f.UserId,
                ProductId = f.ProductId,
                CreatedDate = f.CreatedDate
            }).ToListAsync();
    }

    public async Task<bool> ExistsAsync(int userId, int productId)
    {
        return await _context.FavoritesProducts
            .AnyAsync(f => f.UserId == userId && f.ProductId == productId);
    }

    public async Task<FavoritesProductDto?> AddAsync(int userId, int productId)
    {
        if (await ExistsAsync(userId, productId))
            return null;

        var favorite = new FavoritesProduct
        {
            UserId = userId,
            ProductId = productId,
            CreatedDate = DateTime.UtcNow
        };

        _context.FavoritesProducts.Add(favorite);
        await _context.SaveChangesAsync();

        return new FavoritesProductDto
        {
            Id = favorite.Id,
            UserId = favorite.UserId,
            ProductId = favorite.ProductId,
            CreatedDate = favorite.CreatedDate
        };
    }

    public async Task<bool> DeleteAsync(int id, int userId)
    {
        var favorite = await _context.FavoritesProducts.FindAsync(id);
        if (favorite == null || favorite.UserId != userId)
            return false;

        _context.FavoritesProducts.Remove(favorite);
        await _context.SaveChangesAsync();
        return true;
    }
}
