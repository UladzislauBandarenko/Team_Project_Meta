namespace Team_Project_Meta.DTOs.CartItem
{
    public class CartItemDto
    {
        public int Id { get; set; }
        public int CartId { get; set; }
        public int ProductId { get; set; }
        public int? Quantity { get; set; }
        public bool IsSelected { get; set; } = true;
        public decimal? Price { get; set; }

    }
}
