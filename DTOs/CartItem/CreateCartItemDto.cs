namespace Team_Project_Meta.DTOs.CartItem
{
    public class CreateCartItemDto
    {
        public int CartId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }
}
