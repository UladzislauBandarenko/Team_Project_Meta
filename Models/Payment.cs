namespace Team_Project_Meta.Models
{
    public class Payment
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public DateTime? PaymentDate { get; set; }
        public string? PaymentMethod { get; set; }
        public decimal? Amount { get; set; }
        public string? Status { get; set; } // success, failed, pending

        public Order? Order { get; set; }
    }
}
