using Team_Project_Meta.DTOs.OrderItem;

namespace Team_Project_Meta.DTOs.Order
{
    public class CreateOrderDto
    {
        public int? DeliveryServiceId { get; set; }
        public decimal? TotalPrice { get; set; }
        public string? Status { get; set; }
        public string? Address { get; set; }
        public string? City { get; set; }
        public string? PostalCode { get; set; }
        public string? Country { get; set; }
        public string? PhoneNumber { get; set; }
        public string? ApartmentNumber { get; set; }
        public List<CreateOrderItemDto>? OrderItems { get; set; }
    }
}
