using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Team_Project_Meta.DTOs.Products;
using Team_Project_Meta.Services.Products;

namespace Team_Project_Meta.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductsService _productsService;

        public ProductsController(IProductsService productsService)
        {
            _productsService = productsService;
        }

        [HttpGet]
        public async Task<IActionResult> GetProducts(
            [FromQuery] int? category,
            [FromQuery] decimal? minPrice,
            [FromQuery] decimal? maxPrice)
        {
            var products = await _productsService.GetProductsAsync(category, minPrice, maxPrice);
            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductById(int id)
        {
            var product = await _productsService.GetProductByIdAsync(id);
            if (product == null)
                return NotFound();
            return Ok(product);
        }

        [Authorize(Roles = "admin,seller")]
        [HttpPost]
        [RequestSizeLimit(10_000_000)]
        public async Task<IActionResult> CreateProduct([FromForm] ProductCreateDto form)
        {
            int userId = GetUserIdFromToken();
            var role = User.FindFirst(ClaimTypes.Role)?.Value ?? "";

            byte[]? imageData = null;
            if (form.Image != null && form.Image.Length > 0)
            {
                using var ms = new MemoryStream();
                await form.Image.CopyToAsync(ms);
                imageData = ms.ToArray();
            }

            var dto = new ProductCreateDto
            {
                ProductName = form.ProductName,
                ProductDescription = form.ProductDescription,
                Price = form.Price,
                CategoryId = form.CategoryId,
                StockQuantity = form.StockQuantity,
            };

            var productId = await _productsService.CreateProductAsync(dto, userId, role, imageData);
            return CreatedAtAction(nameof(GetProductById), new { id = productId }, null);
        }




        [Authorize(Roles = "admin,seller")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, [FromForm] ProductUpdateDto dto)
        {
            int userId = GetUserIdFromToken();
            var role = User.FindFirst(ClaimTypes.Role)?.Value ?? "";

            byte[]? imageData = null;
            if (dto.Image != null && dto.Image.Length > 0)
            {
                using var ms = new MemoryStream();
                await dto.Image.CopyToAsync(ms);
                imageData = ms.ToArray();
            }

            var success = await _productsService.UpdateProductAsync(id, dto, userId, role, imageData);
            if (!success)
                return Forbid();

            return NoContent();
        }

        [Authorize(Roles = "seller")]
        [HttpGet("seller")]
        public async Task<ActionResult<IEnumerable<ProductDetailsDto>>> GetProductsBySellerId()
        {
            int sellerId = GetUserIdFromToken();
            var products = await _productsService.GetProductsBySellerIdAsync(sellerId);

            if (!products.Any())
            {
                return NotFound($"No products found for seller ID {sellerId}.");
            }

            return Ok(products);
        }


        private int GetUserIdFromToken()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
                throw new UnauthorizedAccessException("Invalid user ID in token.");
            return userId;
        }

        [HttpGet("bestsellers")]
        public async Task<ActionResult<IEnumerable<ProductListItemDto>>> GetTopBestsellers()
        {
            var products = await _productsService.GetTopBestsellingProductsAsync();
            return Ok(products);
        }

    }

}
