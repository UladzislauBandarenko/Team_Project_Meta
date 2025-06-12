using Team_Project_Meta.DTOs.Products;

namespace Team_Project_Meta.Services.Products
{
    public interface IProductsService
    {
        Task<IEnumerable<ProductListItemDto>> GetProductsAsync(
            int? categoryId,
            decimal? minPrice,
            decimal? maxPrice);

        Task<ProductDetailsDto?> GetProductByIdAsync(int id);
    }

}
