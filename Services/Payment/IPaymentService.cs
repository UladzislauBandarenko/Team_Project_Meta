using Team_Project_Meta.DTOs.Payments;

namespace Team_Project_Meta.Services.Payment
{
    public interface IPaymentService
    {
        Task<PaymentResponseDto> CreatePaymentAsync(PaymentRequestDto request);
    }
}
