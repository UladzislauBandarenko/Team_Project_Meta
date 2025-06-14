using Team_Project_Meta.DTOs.FavoritesProduct;

namespace Team_Project_Meta.Services.FavoritesProducts
{
    public interface IFavoritesProductsService
    {
        Task<IEnumerable<FavoritesProductDto>> GetAllAsync();
        Task<IEnumerable<FavoritesProductDto>> GetByUserIdAsync(int userId);
        Task<FavoritesProductDto?> AddAsync(CreateFavoritesProductDto dto);
        Task<bool> DeleteAsync(int id);
        Task<bool> ExistsAsync(int userId, int productId);
    }
}
