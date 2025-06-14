namespace Team_Project_Meta.DTOs.FavoritesProduct
{
    public class FavoritesProductDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ProductId { get; set; }
        public DateTime? CreatedDate { get; set; }
    }
}
