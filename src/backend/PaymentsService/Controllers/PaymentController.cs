using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using PaymentsService.DTOs;
using PaymentsService.Models;
using PaymentsService.Services;
using System.IdentityModel.Tokens.Jwt;

namespace PaymentsService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PaymentController : ControllerBase
{
    private readonly IPaymentService _paymentService;

    public PaymentController(IPaymentService paymentService)
    {
        _paymentService = paymentService;
    }

    [HttpGet("order/{orderId}")]
    public async Task<IActionResult> GetPaymentHistory(Guid orderId)
    {
        var response = await _paymentService.GetPaymentByOrderIdAsync(orderId);

        if (response is null)
        {
            return NotFound();
        }

        return Ok(response);
    }

    [Authorize]
    [HttpGet]
    public async Task<IActionResult> GetPaymentHistoryByUser()
    {
        var userIdClaim = User.FindFirst(JwtRegisteredClaimNames.Sub);

        if (userIdClaim == null)
        {
            return Unauthorized();
        }

        var userId = Guid.Parse(userIdClaim.Value);
        var response = await _paymentService.GetPaymentByUserIdAsync(userId);

        if (response is null)
        {
            return NotFound();
        }

        return Ok(response);
    }

    [HttpPost]
    public async Task<IActionResult> CreatePayment([FromBody] CreatePaymentDto dto)
    {
       var response = await _paymentService.CreatePaymentAsync(dto.OrderId);

       if (!response.IsSuccess)
        {
            return BadRequest(response);
        }

        return Ok(response);
    }

    [HttpPatch]
    public async Task<IActionResult> UpdatePayment([FromBody] UpdatePaymentDto dto)
    {
        var response = await _paymentService.UpdatePaymentAsync(dto.OrderId, dto.PaymentMethod);

        if (!response.IsSuccess)
        {
            return BadRequest(response);
        }

        return Ok(response);
    }
}