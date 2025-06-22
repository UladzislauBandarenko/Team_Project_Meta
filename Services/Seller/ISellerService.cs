using Team_Project_Meta.DTOs.Seller;

namespace Team_Project_Meta.Services.Seller
{
    public interface ISellerService
    {
        Task<SellerMetricsDto> GetSellerMetricsAsync(int sellerId);
    }
}
