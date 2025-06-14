using Team_Project_Meta.DTOs.CartItem;
namespace Team_Project_Meta.Services.CartItem
{
    public interface ICartItemService
    {
        Task<IEnumerable<CartItemDto>> GetItemsByCartIdAsync(int cartId);
        Task<CartItemDto> AddOrUpdateCartItemAsync(CreateCartItemDto dto);
        Task<bool> UpdateCartItemAsync(int id, UpdateCartItemDto dto);
        Task<bool> DeleteCartItemAsync(int id);
    }
}
