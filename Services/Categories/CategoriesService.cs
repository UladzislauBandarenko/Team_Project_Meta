using Microsoft.EntityFrameworkCore;
using Team_Project_Meta.Data;
using Team_Project_Meta.DTOs.Categories;
using Team_Project_Meta.Models;

namespace Team_Project_Meta.Services.Categories
{
    public class CategoriesService : ICategoriesService
    {
        private readonly AppDbContext _context;

        public CategoriesService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<CategoryDto>> GetAllCategoriesAsync()
        {
            return await _context.Categories
                .Select(c => new CategoryDto
                {
                    Id = c.Id,
                    CategorieName = c.CategorieName
                }).ToListAsync();
        }

        public async Task<CategoryDto> AddCategoryAsync(CreateCategoryDto dto)
        {
            var category = new Category
            {
                CategorieName = dto.CategorieName
            };

            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            return new CategoryDto
            {
                Id = category.Id,
                CategorieName = category.CategorieName
            };
        }

        public async Task<bool> DeleteCategoryAsync(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null) return false;

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
