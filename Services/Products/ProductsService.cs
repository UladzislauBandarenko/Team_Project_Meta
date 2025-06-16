using Team_Project_Meta.Data;
using System.Security.Claims;
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
                ImageData = p.ImageData,
                Price = p.Price ?? 0,
                AverageRating = p.AverageRating,
                ReviewCount = p.ReviewCount,
                StockQuantity = p.StockQuantity ?? 0,
                CategoryName = p.Category?.CategorieName ?? ""
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
                ImageData = product.ImageData,
                ProductDescription = product.ProductDescription,
                Price = product.Price ?? 0,
                CategoryName = product.Category?.CategorieName ?? "",
                StockQuantity = product.StockQuantity ?? 0,
                AverageRating = product.AverageRating,
                ReviewCount = product.ReviewCount,
                SellerName = $"{product.Seller.FirstName} {product.Seller.LastName}"
            };
        }

        public async Task<int> CreateProductAsync(ProductCreateDto dto, int userId, string role)
        {
            var sellerId = role == "seller" ? userId : (dto.SellerId ?? userId);

            var product = new Product
            {
                ProductName = dto.ProductName,
                ProductDescription = dto.ProductDescription,
                ImageData = dto.ImageData,
                Price = dto.Price,
                CategoryId = dto.CategoryId,
                StockQuantity = dto.StockQuantity,
                SellerId = sellerId
            };

            _context.Products.Add(product);
            await _context.SaveChangesAsync();
            return product.Id;
        }

        public async Task<bool> UpdateProductAsync(int id, ProductUpdateDto dto, int userId, string role)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null) return false;

            // Только продавец может обновлять СВОИ товары
            if (role == "seller" && product.SellerId != userId)
                return false;

            product.ProductName = dto.ProductName;
            product.ProductDescription = dto.ProductDescription;
            product.ImageData = dto.ImageData;
            product.Price = dto.Price;
            product.CategoryId = dto.CategoryId;
            product.StockQuantity = dto.StockQuantity;

            await _context.SaveChangesAsync();
            return true;
        }
    }
}
