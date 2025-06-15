namespace Team_Project_Meta.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public decimal? TotalPrice { get; set; }
        public int? DeliveryServiceId { get; set; }
        public string? TrackingNumber { get; set; }
        public string? Status { get; set; } // pending, completed, cancelled
        public DateTime? CreatedDate { get; set; }
        public DateTime? LastUpdatedDate { get; set; }
        public string? Address { get; set; }
        public string? City { get; set; }
        public string? PostalCode { get; set; }
        public string? Country { get; set; }
        public string? PhoneNumber { get; set; }
        public string? ApartmentNumber { get; set; }

        public User? User { get; set; }
        public DeliveryService? DeliveryService { get; set; }
        public ICollection<OrderItem>? OrderItems { get; set; }
        public ICollection<Payment>? Payments { get; set; }
    }
}
