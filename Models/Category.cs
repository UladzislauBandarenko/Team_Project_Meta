namespace Team_Project_Meta.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string? CategorieName { get; set; }

        public ICollection<Product>? Products { get; set; }
    }
}
