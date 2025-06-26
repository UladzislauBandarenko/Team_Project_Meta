using Team_Project_Meta.DTOs.OrderItem;

namespace Team_Project_Meta.DTOs.Order
{
    public class OrderDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public decimal? TotalPrice { get; set; }
        public int? DeliveryServiceId { get; set; }
        public string? TrackingNumber { get; set; }
        public string? Status { get; set; }
        public string? Address { get; set; }
        public string? City { get; set; }
        public string? PostalCode { get; set; }
        public string? Country { get; set; }
        public string? PhoneNumber { get; set; }
        public string? ApartmentNumber { get; set; }
        public List<OrderItemDto>? OrderItems { get; set; } = new();
        public DateTime? CreatedDate { get; set; }
        public DateTime? LastUpdatedDate { get; set; }

        public string? FirstName { get; set; }
        public string? LastName { get; set; }
    }
}
