namespace Team_Project_Meta.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string? ProductName { get; set; }
        public string? ProductDescription { get; set; }
        public decimal? Price { get; set; }
        public int SellerId { get; set; }
        public int CategoryId { get; set; }
        public decimal AverageRating { get; set; } = 0.0M;
        public int ReviewCount { get; set; } = 0;
        public int? StockQuantity { get; set; }
        public byte[]? ImageData { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? LastUpdatedDate { get; set; }

        public User? Seller { get; set; }
        public Category? Category { get; set; }
        public ICollection<OrderItem>? OrderItems { get; set; }
        public ICollection<Review>? Reviews { get; set; }
        public ICollection<CartItem>? CartItems { get; set; }
        public ICollection<FavoritesProduct>? FavoritesProducts { get; set; }
    }
}
