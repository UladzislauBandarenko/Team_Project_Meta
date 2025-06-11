using Team_Project_Meta.Data;
using Team_Project_Meta.DTOs.Products;
using Microsoft.EntityFrameworkCore;
using Team_Project_Meta.Models;

namespace Team_Project_Meta.Services.Products
{
    public class ProductsService : IProductsService
    {
        private readonly AppDbContext _context;

        public ProductsService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ProductListItemDto>> GetProductsAsync(
            int? categoryId, decimal? minPrice, decimal? maxPrice)
        {
            var query = _context.Products
                .Include(p => p.Category)
                .Include(p => p.Seller)
                .AsQueryable();

            if (categoryId.HasValue)
                query = query.Where(p => p.CategoryId == categoryId);

            if (minPrice.HasValue)
                query = query.Where(p => p.Price >= minPrice);

            if (maxPrice.HasValue)
                query = query.Where(p => p.Price <= maxPrice);

            var products = await query.ToListAsync();

            return products.Select(p => new ProductListItemDto
            {
                Id = p.Id,
                ProductName = p.ProductName ?? "",
                Price = p.Price ?? 0,
                CategoryName = p.Category?.CategorieName ?? "",
                AverageRating = p.AverageRating,
                ReviewCount = p.ReviewCount,
                StockQuantity = p.StockQuantity ?? 0
            });
        }

        public async Task<ProductDetailsDto?> GetProductByIdAsync(int id)
        {
            var product = await _context.Products
                .Include(p => p.Category)
                .Include(p => p.Seller)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (product == null) return null;

            return new ProductDetailsDto
            {
                Id = product.Id,
                ProductName = product.ProductName,
                ProductDescription = product.ProductDescription,
                Price = product.Price ?? 0,
                CategoryName = product.Category.CategorieName,
                StockQuantity = product.StockQuantity ?? 0,
                AverageRating = product.AverageRating,
                ReviewCount = product.ReviewCount,
                SellerName = $"{product.Seller.FirstName} {product.Seller.LastName}"
            };
        }
    }

}
