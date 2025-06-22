using Team_Project_Meta.Data;
using Team_Project_Meta.DTOs.Payments;
using Team_Project_Meta.Models;

namespace Team_Project_Meta.Services.Payment
{
    public class PaymentService : IPaymentService
    {
        private readonly AppDbContext _context;

        public PaymentService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<PaymentResponseDto> CreatePaymentAsync(PaymentRequestDto request)
        {
            var order = await _context.Orders.FindAsync(request.OrderId);
            if (order == null)
                throw new Exception("Order not found.");

            var payment = new Models.Payment
            {
                OrderId = request.OrderId,
                PaymentDate = DateTime.UtcNow,
                PaymentMethod = request.PaymentMethod,
                Amount = request.Amount,
                Status = "success"
            };

            _context.Payments.Add(payment);
            await _context.SaveChangesAsync();

            return new PaymentResponseDto
            {
                PaymentId = payment.Id,
                PaymentMethod = payment.PaymentMethod ?? "",
                PaymentDate = payment.PaymentDate ?? DateTime.UtcNow,
                Amount = payment.Amount ?? 0,
                Status = payment.Status ?? "success"
            };
        }
    }
}
