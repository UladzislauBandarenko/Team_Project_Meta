namespace Team_Project_Meta.Models
{
    public class CartItem
    {
        public int Id { get; set; }
        public int CartId { get; set; }
        public int ProductId { get; set; }
        public int? Quantity { get; set; }
        public bool IsSelected { get; set; } = true; // Default to true

        public Cart? Cart { get; set; }
        public Product? Product { get; set; }
    }
}
