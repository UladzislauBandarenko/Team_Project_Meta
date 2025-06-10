namespace Team_Project_Meta.Models
{
    public class DeliveryService
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Website { get; set; }

        public ICollection<Order>? Orders { get; set; }
    }
}
