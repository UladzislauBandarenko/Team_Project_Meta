namespace Team_Project_Meta.DTOs.Seller
{
    public class PopularProductDto
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int? OrderCount { get; set; }
        public decimal? TotalRevenue { get; set; }
    }
}
