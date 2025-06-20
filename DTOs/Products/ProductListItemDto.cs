namespace Team_Project_Meta.DTOs.Products
{
    public class ProductListItemDto
    {
        public int Id { get; set; }
        public string ProductName { get; set; }
        public decimal Price { get; set; }
        public string CategoryName { get; set; }
        public decimal AverageRating { get; set; }
        public int ReviewCount { get; set; }
        public bool InStock => StockQuantity > 0;
        public int StockQuantity { get; set; }
        public string? ImageBase64 { get; set; }
    }
}
