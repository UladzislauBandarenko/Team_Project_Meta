namespace Team_Project_Meta.DTOs.Payments
{
    public class PaymentResponseDto
    {
        public int PaymentId { get; set; }
        public string PaymentMethod { get; set; } = string.Empty;
        public DateTime PaymentDate { get; set; }
        public decimal Amount { get; set; }
        public string Status { get; set; } = string.Empty;
    }
}
