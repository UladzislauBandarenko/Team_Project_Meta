namespace Team_Project_Meta.DTOs.Products
{
    public class ProductDetailsDto
    {
        public int Id { get; set; }
        public string ProductName { get; set; }
        public string ProductDescription { get; set; }
        public decimal Price { get; set; }
        public string CategoryName { get; set; }
        public int StockQuantity { get; set; }
        public decimal AverageRating { get; set; }
        public int ReviewCount { get; set; }
        public string SellerName { get; set; }
        public byte[]? ImageData { get; set; }
    }
}
