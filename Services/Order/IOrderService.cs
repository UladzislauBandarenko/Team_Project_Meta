using Team_Project_Meta.DTOs.Order;

namespace Team_Project_Meta.Services.Order
{
    public interface IOrderService
    {
        Task<IEnumerable<OrderDto>> GetOrdersAsync();
        Task<IEnumerable<OrderDto>> GetOrdersByUserIdAsync(int userId);
        Task<OrderDto?> GetOrderByIdAsync(int id);
        Task<OrderDto> CreateOrderAsync(CreateOrderDto dto, int userId, bool SaveShiping);
        Task<bool> DeleteOrderAsync(int id);
        Task<IEnumerable<OrderDto>> GetOrdersBySellerIdAsync(int sellerId);
    }
}


