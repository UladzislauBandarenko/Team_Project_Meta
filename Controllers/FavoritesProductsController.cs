using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Team_Project_Meta.DTOs.FavoritesProduct;
using Team_Project_Meta.Services.FavoritesProducts;

[ApiController]
[Route("api/[controller]")]
public class FavoritesProductsController : ControllerBase
{
    private readonly IFavoritesProductsService _service;

    public FavoritesProductsController(IFavoritesProductsService service)
    {
        _service = service;
    }

    // 1) Админ смотрит все фавориты всех пользователей
    [HttpGet]
    [Authorize(Roles = "admin")]
    public async Task<IActionResult> GetAll()
    {
        var favorites = await _service.GetAllAsync();
        return Ok(favorites);
    }

    // 4) Пользователь смотрит свои фавориты
    [HttpGet("me")]
    [Authorize(Roles = "buyer")]
    public async Task<IActionResult> GetMyFavorites()
    {
        int userId = GetUserIdFromToken();
        var favorites = await _service.GetByUserIdAsync(userId);
        return Ok(favorites);
    }

    // 2) Пользователь добавляет продукт в свои фавориты
    [HttpPost]
    [Authorize(Roles = "buyer")]
    public async Task<IActionResult> Add([FromBody] CreateFavoritesProductDto dto)
    {
        int userId = GetUserIdFromToken();

        var added = await _service.AddAsync(userId, dto.ProductId);
        if (added == null)
            return Conflict("Product already in favorites.");

        return CreatedAtAction(nameof(GetMyFavorites), null, added);
    }

    // 3) Пользователь удаляет свой продукт из фаворитов
    [HttpDelete("{productId}")]
    [Authorize(Roles = "buyer")]
    public async Task<IActionResult> DeleteByProductId(int productId)
    {
        int userId = GetUserIdFromToken();

        var deleted = await _service.DeleteByProductIdAsync(productId, userId);
        if (!deleted)
            return NotFound("Favorite not found or not yours.");

        return NoContent();
    }

    private int GetUserIdFromToken()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
            throw new UnauthorizedAccessException("Invalid user ID in token.");
        return userId;
    }
}
