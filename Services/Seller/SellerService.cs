using Microsoft.EntityFrameworkCore;
using Team_Project_Meta.Data;
using Team_Project_Meta.DTOs;
using Team_Project_Meta.DTOs.Reviews;
using Team_Project_Meta.DTOs.Seller;
using Team_Project_Meta.Models;

namespace Team_Project_Meta.Services.Seller
{
    public class SellerService : ISellerService
    {
        private readonly AppDbContext _context;
        private const decimal PLATFORM_COMMISSION_RATE = 0.10m; // 10% commission
        private const int TOP_PRODUCTS_COUNT = 5; // Number of popular products to return

        public SellerService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<SellerMetricsDto> GetSellerMetricsAsync(int sellerId)
        {
            // Get completed or delivered orders for this seller
            var completedOrders = await _context.Orders
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Product)
                .Where(o => o.OrderItems.Any(oi => oi.Product.SellerId == sellerId) &&
                           (o.Status == "completed" || o.Status == "delivered"))
                .ToListAsync();

            // Calculate total sales and orders for seller's products
            decimal totalSales = (decimal)completedOrders.SelectMany(o => o.OrderItems)
                .Where(oi => oi.Product.SellerId == sellerId)
                .Sum(oi => oi.Price * oi.Quantity);

            // Calculate net profit (after platform commission)
            decimal netProfit = totalSales * (1 - PLATFORM_COMMISSION_RATE);

            // Calculate average order value
            decimal averageOrderValue = completedOrders.Any()
                ? totalSales / completedOrders.Count
                : 0;

            // Get popular products
            var popularProducts = await GetPopularProductsAsync(sellerId);

            // Get seller's average rating and recent reviews
            var reviews = await GetSellerReviewsAsync(sellerId);
            var averageRating = reviews.Any() ? reviews.Average(r => r.Rating) : 0;

            return new SellerMetricsDto
            {
                TotalSales = totalSales,
                NetProfit = netProfit,
                AverageOrderValue = averageOrderValue,
                TotalOrders = completedOrders.Count,
                PopularProducts = popularProducts,
                AverageRating = (decimal)averageRating,
                RecentReviews = reviews.Take(5).ToList() // Take 5 most recent reviews
            };
        }

        private async Task<List<PopularProductDto>> GetPopularProductsAsync(int sellerId)
        {
            return await _context.OrderItems
                .Include(oi => oi.Order)
                .Include(oi => oi.Product)
                .Where(oi => oi.Product.SellerId == sellerId &&
                            (oi.Order.Status == "completed" || oi.Order.Status == "delivered"))
                .GroupBy(oi => new { oi.ProductId, oi.Product.ProductName, oi.Product.Price })
                .Select(g => new PopularProductDto
                {
                    ProductId = g.Key.ProductId,
                    Name = g.Key.ProductName,
                    Price = (decimal)g.Key.Price,
                    OrderCount = g.Sum(oi => oi.Quantity),
                    TotalRevenue = g.Sum(oi => oi.Price * oi.Quantity)
                })
                .OrderByDescending(p => p.OrderCount)
                .Take(TOP_PRODUCTS_COUNT)
                .ToListAsync();
        }


        private async Task<List<ReviewDto>> GetSellerReviewsAsync(int sellerId)
        {
            return await _context.Reviews
                .Include(r => r.User)
                .Where(r => r.Product.SellerId == sellerId)
                .OrderByDescending(r => r.CreatedDate)
                .Select(r => new ReviewDto
                {
                    Id = r.Id,
                    Rating = r.Rating,
                    Comment = r.Comment,
                    CreatedDate = r.CreatedDate,
                    UserId = r.UserId,
                    UserName = r.User.FirstName,
                })
                .ToListAsync();
        }
    }
}
