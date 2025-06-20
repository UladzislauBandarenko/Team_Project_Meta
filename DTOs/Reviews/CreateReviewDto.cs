namespace Team_Project_Meta.DTOs.Reviews
{
    public class CreateReviewDto
    {
        public int OrderId { get; set; }
        public int ProductId { get; set; }
        public int Rating { get; set; } // Must be between 1 and 5
        public string? Comment { get; set; }
    }
}
