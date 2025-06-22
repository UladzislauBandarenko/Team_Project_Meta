namespace Team_Project_Meta.DTOs.Seller
{
    public class SellerMetricsDto
    {
        public decimal? TotalSales { get; set; }
        public decimal NetProfit { get; set; }
        public decimal AverageOrderValue { get; set; }
        public int? TotalOrders { get; set; }
        public List<PopularProductDto> PopularProducts { get; set; }
        public decimal AverageRating { get; set; }
        public List<ReviewDto> RecentReviews { get; set; }
    }
}
