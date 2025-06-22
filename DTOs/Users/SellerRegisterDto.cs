namespace Team_Project_Meta.DTOs.Users
{
    public class SellerRegisterDto
    {
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string? Address { get; set; } = null!;
        public string? City { get; set; } = null!;
        public string? PostalCode { get; set; } = null!;
        public string? Country { get; set; } = null!;
        public string? PhoneNumber { get; set; } = null!;
        public string? ApartmentNumber { get; set; } = null!;
    }
}
