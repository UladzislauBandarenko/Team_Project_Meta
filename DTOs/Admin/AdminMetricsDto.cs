namespace Team_Project_Meta.DTOs.Admin
{
    public class AdminMetricsDto
    {
        public decimal? TotalSales { get; set; }
        public decimal PlatformProfit { get; set; }
        public decimal AverageOrderValue { get; set; }
        public decimal CharityDonations { get; set; }
        public int TotalUsers { get; set; }
        public int TotalOrders { get; set; }
    }
}
