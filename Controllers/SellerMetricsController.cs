using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Team_Project_Meta.DTOs.Seller;
using Team_Project_Meta.Models;
using Team_Project_Meta.Services.Seller;

namespace Team_Project_Meta.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "seller")]
    public class SellerMetricsController : ControllerBase
    {
        private readonly ISellerService _sellerService;

        public SellerMetricsController(ISellerService sellerService)
        {
            _sellerService = sellerService;
        }


        [HttpGet("metrics")]
        public async Task<ActionResult<SellerMetricsDto>> GetMetrics()
        {
            var sellerId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value
                ?? throw new UnauthorizedAccessException("User not authenticated"));

            var metrics = await _sellerService.GetSellerMetricsAsync(sellerId);
            return Ok(metrics);
        }
    }
}
