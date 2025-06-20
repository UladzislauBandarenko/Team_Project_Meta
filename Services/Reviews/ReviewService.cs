using Microsoft.EntityFrameworkCore;
using Team_Project_Meta.Data;
using Team_Project_Meta.DTOs;
using Team_Project_Meta.DTOs.Reviews;
using Team_Project_Meta.Models;

namespace Team_Project_Meta.Services.Reviews
{
    public class ReviewService : IReviewService
    {
        private readonly AppDbContext _context;

        public ReviewService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<bool> CreateReviewAsync(CreateReviewDto dto, int userId)
        {
            // Check if the order belongs to the user and is delivered
            var order = await _context.Orders
                .Include(o => o.OrderItems)
                .FirstOrDefaultAsync(o => o.Id == dto.OrderId && o.UserId == userId && o.Status == "delivered");

            if (order == null || !order.OrderItems.Any(oi => oi.ProductId == dto.ProductId))
                return false;

            // Prevent duplicate reviews
            var existingReview = await _context.Reviews
                .FirstOrDefaultAsync(r => r.ProductId == dto.ProductId && r.UserId == userId);
            if (existingReview != null)
                return false;

            var review = new Review
            {
                ProductId = dto.ProductId,
                UserId = userId,
                Rating = dto.Rating,
                Comment = dto.Comment,
                CreatedDate = DateTime.UtcNow
            };

            _context.Reviews.Add(review);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<List<ReviewDto>> GetReviewsByProductIdAsync(int productId)
        {
            return await _context.Reviews
                .Where(r => r.ProductId == productId)
                .Include(r => r.User)
                .Select(r => new ReviewDto
                {
                    Id = r.Id,
                    Rating = r.Rating ?? 0,
                    Comment = r.Comment,
                    CreatedDate = r.CreatedDate,
                    UserId = r.UserId,
                    UserName = r.User != null ? r.User.FirstName : null  // Adjust property based on your User model
                })
                .ToListAsync();
        }

        // Delete review by id (optionally check user ownership if needed)
        public async Task<bool> DeleteReviewAsync(int reviewId)
        {
            var review = await _context.Reviews.FindAsync(reviewId);
            if (review == null)
                return false;

            _context.Reviews.Remove(review);
            await _context.SaveChangesAsync();
            return true;
        }

    }
}
