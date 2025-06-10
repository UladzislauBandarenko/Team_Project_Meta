namespace Team_Project_Meta.Models
{
    public class Cart
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? LastUpdatedDate { get; set; }

        public User? User { get; set; }
        public ICollection<CartItem>? CartItems { get; set; }
    }
}
