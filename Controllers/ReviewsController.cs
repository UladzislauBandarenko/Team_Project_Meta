using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Team_Project_Meta.Data;
using Team_Project_Meta.DTOs.Reviews;
using Team_Project_Meta.Models;
using Team_Project_Meta.Services.Reviews;

namespace Team_Project_Meta.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReviewsController : ControllerBase
    {
        private readonly IReviewService _reviewService;

        public ReviewsController(IReviewService reviewService)
        {
            _reviewService = reviewService;
        }

        [Authorize(Roles = "buyer")]
        [HttpPost]
        public async Task<IActionResult> CreateReview([FromBody] CreateReviewDto dto)
        {
            // Validate rating
            if (dto.Rating < 1 || dto.Rating > 5)
                return BadRequest("Rating must be between 1 and 5.");

            // Get user ID from JWT
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
                return Unauthorized();

            int userId = int.Parse(userIdClaim.Value);

            var success = await _reviewService.CreateReviewAsync(dto, userId);
            if (!success)
                return BadRequest("Review could not be created. Make sure the order is delivered and the review is not duplicated.");

            return Ok("Review created successfully.");
        }

        // GET api/reviews/product/{productId}
        [HttpGet("product/{productId}")]
        [AllowAnonymous]  // allow public read access
        public async Task<IActionResult> GetReviewsByProductId(int productId)
        {
            var reviews = await _reviewService.GetReviewsByProductIdAsync(productId);
            return Ok(reviews);
        }

        // DELETE api/reviews/{reviewId}
        [Authorize(Roles = "admin")]
        [HttpDelete("{reviewId}")]
        public async Task<IActionResult> DeleteReview(int reviewId)
        {

            var success = await _reviewService.DeleteReviewAsync(reviewId);
            if (!success)
                return NotFound();

            return NoContent();
        }
    }
}
