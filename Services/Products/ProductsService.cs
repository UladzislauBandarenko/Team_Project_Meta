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

            var products = await query
                .Select(p => new ProductListItemDto
                {
                    Id = p.Id,
                    ProductName = p.ProductName ?? "",
                    ImageBase64 = p.ImageData != null ? Convert.ToBase64String(p.ImageData) : null,
                    Price = p.Price ?? 0,
                    AverageRating = _context.Reviews
                        .Where(r => r.ProductId == p.Id && r.Rating.HasValue)
                        .Select(r => (decimal?)r.Rating)
                        .Average() ?? 0,
                    ReviewCount = _context.Reviews
                        .Count(r => r.ProductId == p.Id),
                    StockQuantity = p.StockQuantity ?? 0,
                    CategoryName = p.Category!.CategorieName ?? ""
                })
                .ToListAsync();

            return products;
        }

        public async Task<IEnumerable<ProductDetailsDto>> GetProductsBySellerIdAsync(int sellerId)
        {
            return await _context.Products
                .Where(p => p.SellerId == sellerId)
                .Include(p => p.Category)
                .Include(p => p.Seller)
                .Select(p => new ProductDetailsDto
                {
                    Id = p.Id,
                    ProductName = p.ProductName ?? "",
                    ProductDescription = p.ProductDescription ?? "",
                    Price = p.Price ?? 0,
                    CategoryName = p.Category.CategorieName,
                    StockQuantity = p.StockQuantity ?? 0,
                    AverageRating = p.AverageRating,
                    ReviewCount = p.ReviewCount,
                    SellerName = p.Seller != null ? $"{p.Seller.FirstName} {p.Seller.LastName}" : "Unknown",
                    ImageBase64 = p.ImageData != null ? Convert.ToBase64String(p.ImageData) : null
                })
                .ToListAsync();
        }

        public async Task<IEnumerable<ProductListItemDto>> GetTopBestsellingProductsAsync(int count = 8)
        {
            var products = await _context.Products
                .Include(p => p.Category)
                .Where(p => p.StockQuantity > 0)
                .Select(p => new ProductListItemDto
                {
                    Id = p.Id,
                    ProductName = p.ProductName ?? "",
                    Price = p.Price ?? 0,
                    CategoryName = p.Category.CategorieName,
                    StockQuantity = p.StockQuantity ?? 0,
                    ImageBase64 = p.ImageData != null ? Convert.ToBase64String(p.ImageData) : null,
                    // From Reviews table
                    AverageRating = _context.Reviews
                        .Where(r => r.ProductId == p.Id && r.Rating.HasValue)
                        .Select(r => (decimal?)r.Rating)
                        .Average() ?? 0,
                    ReviewCount = _context.Reviews
                        .Count(r => r.ProductId == p.Id)
                })
                .OrderByDescending(p => p.AverageRating)
                .ThenByDescending(p => p.ReviewCount)
                .Take(count)
                .ToListAsync();

            return products;
        }

        public async Task<ProductDetailsDto?> GetProductByIdAsync(int id)
        {
            var product = await _context.Products
                .Include(p => p.Category)
                .Include(p => p.Seller)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (product == null) return null;

            var averageRating = await _context.Reviews
                .Where(r => r.ProductId == id && r.Rating.HasValue)
                .Select(r => (decimal?)r.Rating)
                .AverageAsync() ?? 0;

            var reviewCount = await _context.Reviews
                .CountAsync(r => r.ProductId == id);

            return new ProductDetailsDto
            {
                Id = product.Id,
                ProductName = product.ProductName,
                ImageBase64 = product.ImageData != null ? Convert.ToBase64String(product.ImageData) : null,
                ProductDescription = product.ProductDescription,
                Price = product.Price ?? 0,
                CategoryName = product.Category?.CategorieName ?? "",
                StockQuantity = product.StockQuantity ?? 0,
                AverageRating = averageRating,
                ReviewCount = reviewCount,
                SellerName = $"{product.Seller.FirstName} {product.Seller.LastName}"
            };
        }



        public async Task<int> CreateProductAsync(ProductCreateDto dto, int userId, string role, byte[]? imageData)
        {

            var product = new Product
            {
                ProductName = dto.ProductName,
                ProductDescription = dto.ProductDescription,
                Price = dto.Price,
                CategoryId = dto.CategoryId,
                StockQuantity = dto.StockQuantity,
                SellerId = userId,
                ImageData = imageData
            };

            _context.Products.Add(product);
            await _context.SaveChangesAsync();
            return product.Id;
        }




        public async Task<bool> UpdateProductAsync(int id, ProductUpdateDto dto, int userId, string role, byte[]? imageData)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null) return false;

            // Только продавец может обновлять СВОИ товары
            if (role == "seller" && product.SellerId != userId)
                return false;

            // Обновляем только если есть изменения
            if (!string.IsNullOrWhiteSpace(dto.ProductName))
                product.ProductName = dto.ProductName;

            if (!string.IsNullOrWhiteSpace(dto.ProductDescription))
                product.ProductDescription = dto.ProductDescription;

            if (dto.Price.HasValue)
                product.Price = dto.Price.Value;

            if (dto.CategoryId.HasValue)
                product.CategoryId = dto.CategoryId.Value;

            if (dto.StockQuantity.HasValue)
                product.StockQuantity = dto.StockQuantity.Value;

            if (imageData != null)
                product.ImageData = imageData;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteProductAsync(int id, int userId, string role)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
                return false;

            if (role == "seller" && product.SellerId != userId)
                return false;

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            return true;
        }

    }
}
