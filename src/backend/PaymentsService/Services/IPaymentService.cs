using System;
using PaymentsService.DTOs;
using PaymentsService.Enums;
using PaymentsService.Models;

namespace PaymentsService.Services;

public interface IPaymentService
{
    Task<Payment?> GetPaymentByOrderIdAsync(Guid orderId, Guid userId);
    Task<List<Payment>> GetPaymentByUserIdAsync(Guid userId);
    Task<PaymentResult> CreatePaymentAsync(Guid orderId);
    Task<PaymentResult> UpdatePaymentAsync(Guid orderId, PaymentMethod paymentMethod);
}