using Team_Project_Meta.DTOs.CartItem;

namespace Team_Project_Meta.DTOs.Cart
{
    public class CreateCartDto
    {
        public List<CreateCartItemDto> Items { get; set; } = new();
    }
}
