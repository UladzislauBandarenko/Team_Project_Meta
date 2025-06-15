namespace Team_Project_Meta.DTOs.Products
{
    public class ProductCreateDto
    {
        public string ProductName { get; set; } = null!;
        public string ProductDescription { get; set; } = null!;
        public decimal Price { get; set; }
        public int CategoryId { get; set; } 
        public int StockQuantity { get; set; }
        public byte[]? ImageData { get; set; }
        public int? SellerId { get; set; }
    }
}
