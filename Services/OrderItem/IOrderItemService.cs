using Team_Project_Meta.DTOs.OrderItem;

namespace Team_Project_Meta.Services.OrderItem
{
    public interface IOrderItemService
    {
        Task<IEnumerable<OrderItemDto>> GetItemsByOrderIdAsync(int orderId);
        Task<OrderItemDto> AddOrderItemAsync(CreateOrderItemDto dto);
        Task<bool> DeleteOrderItemAsync(int id);
    }
}
