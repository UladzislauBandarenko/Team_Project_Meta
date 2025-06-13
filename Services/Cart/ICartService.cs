using Team_Project_Meta.DTOs.Cart;
namespace Team_Project_Meta.Services.Cart
{
    public interface ICartService
    {
        Task<CartDto> GetCartByUserIdAsync(int userId);
        Task<CartDto> CreateCartAsync(CreateCartDto dto);
        Task<bool> DeleteCartAsync(int cartId);
    }
}