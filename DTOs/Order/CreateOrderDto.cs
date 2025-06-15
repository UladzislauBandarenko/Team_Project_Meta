using Team_Project_Meta.DTOs.OrderItem;

namespace Team_Project_Meta.DTOs.Order
{
    public class CreateOrderDto
    {
        public int? DeliveryServiceId { get; set; }
        public decimal? TotalPrice { get; set; }
        public string? Status { get; set; }
        public List<CreateOrderItemDto>? OrderItems { get; set; }
    }
}
