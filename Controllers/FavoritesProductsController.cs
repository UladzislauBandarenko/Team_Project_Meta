using Microsoft.AspNetCore.Mvc;
using Team_Project_Meta.DTOs.FavoritesProduct; 
using Team_Project_Meta.Services.FavoritesProducts;

namespace Team_Project_Meta.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FavoritesProductsController : ControllerBase
    {
        private readonly IFavoritesProductsService _service;

        public FavoritesProductsController(IFavoritesProductsService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var favorites = await _service.GetAllAsync();
            return Ok(favorites);
        }

        [HttpGet("by-user/{userId}")]
        public async Task<IActionResult> GetByUser(int userId)
        {
            var favorites = await _service.GetByUserIdAsync(userId);
            return Ok(favorites);
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] CreateFavoritesProductDto dto)
        {
            var added = await _service.AddAsync(dto);
            if (added == null) return Conflict("Product already in favorites.");
            return CreatedAtAction(nameof(GetByUser), new { userId = dto.UserId }, added);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _service.DeleteAsync(id);
            if (!deleted) return NotFound();
            return NoContent();
        }

        [HttpGet("exists")]
        public async Task<IActionResult> Exists([FromQuery] int userId, [FromQuery] int productId)
        {
            var exists = await _service.ExistsAsync(userId, productId);
            return Ok(exists);
        }
    }
}
