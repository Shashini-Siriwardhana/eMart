using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using PaymentsService.DTOs;
using PaymentsService.Models;
using PaymentsService.Services;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;

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

    [Authorize]
    [HttpGet("order/{orderId}")]
    public async Task<IActionResult> GetPaymentHistory(Guid orderId)
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (!Guid.TryParse(userIdClaim, out var userId))
        {
            return Unauthorized();
        }

        var response = await _paymentService.GetPaymentByOrderIdAsync(orderId, userId);

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
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (!Guid.TryParse(userIdClaim, out var userId))
        {
            return Unauthorized();
        }

        var response = await _paymentService.GetPaymentByUserIdAsync(userId);

        if (response is null)
        {
            return NotFound();
        }

        return Ok(response);
    }

    [Authorize]
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

    [Authorize]
    [HttpPatch]
    public async Task<IActionResult> UpdatePayment([FromBody] UpdatePaymentDto dto)
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (!Guid.TryParse(userIdClaim, out var userId))
        {
            return Unauthorized();
        }

        var response = await _paymentService.UpdatePaymentAsync(dto.OrderId, dto.PaymentMethod);

        if (!response.IsSuccess)
        {
            return BadRequest(response);
        }

        return Ok(response);
    }
}