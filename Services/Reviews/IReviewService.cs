using Team_Project_Meta.DTOs;
using Team_Project_Meta.DTOs.Reviews;

namespace Team_Project_Meta.Services.Reviews
{
    public interface IReviewService 
    {
        Task<bool> CreateReviewAsync(CreateReviewDto dto, int userId);
        Task<List<ReviewDto>> GetReviewsByProductIdAsync(int productId);
        Task<bool> DeleteReviewAsync(int reviewId);
    }
}
