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
        Task<int> CreateProductAsync(ProductCreateDto dto, int userId, string role, byte[]? imageData);
        Task<bool> UpdateProductAsync(int id, ProductUpdateDto dto, int userId, string role, byte[]? imageData);
        Task<IEnumerable<ProductDetailsDto>> GetProductsBySellerIdAsync(int sellerId);
        Task<IEnumerable<ProductListItemDto>> GetTopBestsellingProductsAsync(int count = 8);
        Task<bool> DeleteProductAsync(int id, int userId, string role);
    }
}
