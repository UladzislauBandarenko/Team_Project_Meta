namespace Team_Project_Meta.Models
{
    public class FavoritesProduct
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ProductId { get; set; }
        public DateTime? CreatedDate { get; set; }

        public User? User { get; set; }
        public Product? Product { get; set; }
    }
}
