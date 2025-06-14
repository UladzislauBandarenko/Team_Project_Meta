namespace Team_Project_Meta.DTOs.Order
{
    public class UpdateOrderDto
    {
        public int? DeliveryServiceId { get; set; }
        public string? TrackingNumber { get; set; }
        public string? Status { get; set; }
        public decimal? TotalPrice { get; set; }
    }
}
