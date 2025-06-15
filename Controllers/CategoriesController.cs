using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Team_Project_Meta.DTOs.Categories;
using Team_Project_Meta.Services.Categories;

namespace Team_Project_Meta.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoriesService _categoriesService;

        public CategoriesController(ICategoriesService categoriesService)
        {
            _categoriesService = categoriesService;
        }

        //Доступен всем
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAll()
        {
            var categories = await _categoriesService.GetAllCategoriesAsync();
            return Ok(categories);
        }

        //Только admin
        [HttpPost]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> AddCategory([FromBody] CreateCategoryDto dto)
        {
            var category = await _categoriesService.AddCategoryAsync(dto);
            return Ok(category);
        }

        // Только admin
        [HttpDelete("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var success = await _categoriesService.DeleteCategoryAsync(id);
            return success ? Ok() : NotFound();
        }
    }
}
