using Team_Project_Meta.DTOs.FavoritesProduct;

namespace Team_Project_Meta.Services.FavoritesProducts
{
    public interface IFavoritesProductsService
    {
        Task<IEnumerable<FavoritesProductDto>> GetAllAsync(); // для админа
        Task<IEnumerable<FavoritesProductDto>> GetByUserIdAsync(int userId);

        // Метод принимает userId и productId отдельно
        Task<FavoritesProductDto?> AddAsync(int userId, int productId);

        // Delete учитывает userId для проверки прав удаления
        Task<bool> DeleteAsync(int id, int userId);
        Task<bool> ExistsAsync(int userId, int productId);
    }
}
