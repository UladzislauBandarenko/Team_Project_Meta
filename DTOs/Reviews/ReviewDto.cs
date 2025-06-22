namespace Team_Project_Meta.DTOs
{
    public class ReviewDto
    {
        public int Id { get; set; }
        public int? Rating { get; set; }
        public string? Comment { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int UserId { get; set; }
        public string? UserName { get; set; } // or email etc., from User entity
    }
}
