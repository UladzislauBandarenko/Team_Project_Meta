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
        public DateTime? CreatedDate { get; set; }
        public DateTime? LastUpdatedDate { get; set; }
    }
}
