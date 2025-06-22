using Team_Project_Meta.Data;
using Team_Project_Meta.DTOs.Admin;
using Microsoft.EntityFrameworkCore;

namespace Team_Project_Meta.Services.Admin
{
    public class AdminService : IAdminService
    {
        private readonly AppDbContext _context;
        private const decimal PLATFORM_COMMISSION_RATE = 0.10m; // 10% commission
        private const decimal CHARITY_DONATION_RATE = 0.05m; // 5% of platform profit goes to charity

        public AdminService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<AdminMetricsDto> GetMetricsAsync()
        {
            // Get completed orders
            var completedOrders = await _context.Orders
                .Where(o => o.Status == "completed")
                .ToListAsync();

            // Calculate total sales
            decimal totalSales = (decimal)completedOrders.Sum(o => o.TotalPrice);

            // Calculate platform profit (commission)
            decimal platformProfit = totalSales * PLATFORM_COMMISSION_RATE;

            // Calculate average order value
            decimal averageOrderValue = completedOrders.Any()
                ? totalSales / completedOrders.Count
                : 0;

            // Calculate charity donations
            decimal charityDonations = platformProfit * CHARITY_DONATION_RATE;

            // Get total users count
            int totalUsers = await _context.Users.CountAsync();

            // Get total orders count (all orders, not just completed)
            int totalOrders = await _context.Orders.CountAsync();

            return new AdminMetricsDto
            {
                TotalSales = totalSales,
                PlatformProfit = platformProfit,
                AverageOrderValue = averageOrderValue,
                CharityDonations = charityDonations,
                TotalUsers = totalUsers,
                TotalOrders = totalOrders
            };
        }
    }
}
