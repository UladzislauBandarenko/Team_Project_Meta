namespace Team_Project_Meta.DTOs.Payments
{
    public class PaymentRequestDto
    {
        public int OrderId { get; set; }
        public string PaymentMethod { get; set; } // "CreditCard", "PayPal", "ApplePay"
        public decimal Amount { get; set; }
    }

}
