using Team_Project_Meta.DTOs.CartItem;

namespace Team_Project_Meta.Services.CartItem
{
    public interface ICartItemService
    {
        Task<IEnumerable<CartItemDto>> GetItemsByCartIdAsync(int cartId);
        Task<CartItemDto> AddOrUpdateCartItemAsync(CreateCartItemDto dto, int userId);
        Task<bool> UpdateCartItemAsync(int cartId, int itemId, int userId, UpdateCartItemDto dto);
        Task<bool> DeleteCartItemAsync(int id, int userId);
        Task<int> GetOrCreateUserCartIdAsync(int userId);
    }
}
