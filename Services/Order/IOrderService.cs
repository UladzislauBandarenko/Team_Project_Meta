using Team_Project_Meta.DTOs.Order;

namespace Team_Project_Meta.Services.Order
{
    public interface IOrderService
    {
        Task<IEnumerable<OrderDto>> GetOrdersAsync();                      // Все заказы
        Task<IEnumerable<OrderDto>> GetOrdersByUserIdAsync(int userId);   // Заказы по пользователю
        Task<OrderDto?> GetOrderByIdAsync(int id);                         // Один заказ по ID
        Task<OrderDto> CreateOrderAsync(CreateOrderDto dto);              // Создание
        Task<bool> UpdateOrderAsync(int id, UpdateOrderDto dto);          // Обновление
        Task<bool> DeleteOrderAsync(int id);                               // Удаление
    }
}


