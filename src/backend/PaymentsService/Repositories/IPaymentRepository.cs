using System;
using PaymentsService.DTOs;
using PaymentsService.Enums;
using PaymentsService.Models;

namespace PaymentsService.Repositories;

public interface IPaymentRepository
{
    Task<Payment?> GetPaymentByOrderIdAsync(Guid orderId, Guid userId);
    Task<List<Payment>> GetPaymentByUserIdAsync(Guid userId);
    Task CreatePaymentAsync(Payment payment);
    Task UpdatePaymentAsync(Payment payment);
    Task SaveChangesAsync();
}