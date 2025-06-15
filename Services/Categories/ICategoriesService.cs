using Team_Project_Meta.DTOs.Categories;

namespace Team_Project_Meta.Services.Categories
{
    public interface ICategoriesService
    {
        Task<List<CategoryDto>> GetAllCategoriesAsync();
        Task<CategoryDto> AddCategoryAsync(CreateCategoryDto dto);
        Task<bool> DeleteCategoryAsync(int id);
    }
}
