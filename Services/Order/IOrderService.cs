using Team_Project_Meta.DTOs.Order;

namespace Team_Project_Meta.Services.Order
{
    public interface IOrderService
    {
        Task<OrderDto?> GetOrderByIdAsync(int id);
        Task<OrderDto> CreateOrderAsync(CreateOrderDto dto);
        Task<bool> DeleteOrderAsync(int id);
    }
}
