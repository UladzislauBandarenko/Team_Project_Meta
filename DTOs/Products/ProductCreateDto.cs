namespace Team_Project_Meta.DTOs.Products
{
    public class ProductCreateDto
    {
        public string ProductName { get; set; } = string.Empty;
        public string ProductDescription { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int CategoryId { get; set; }
        public int StockQuantity { get; set; }
        public IFormFile? Image { get; set; }
    }
}
