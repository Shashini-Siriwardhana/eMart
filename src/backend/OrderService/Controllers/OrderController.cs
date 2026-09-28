using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using OrderService.DTOs;
using OrderService.Messaging;
using OrderService.Services;
using Shared.Messaging.Events;

namespace OrderService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrderController : ControllerBase
{
    private readonly IOrdersService _ordersService;
    private readonly IEventPublisher _eventPublisher;

    public OrderController(IOrdersService ordersService, IEventPublisher eventPublisher)
    {
        _ordersService = ordersService;
        _eventPublisher = eventPublisher;
    }

    [Authorize]
    [HttpGet]
    public async Task<IActionResult> GetAllOrders()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (!Guid.TryParse(userIdClaim, out var userId))
        {
            return Unauthorized();
        }
        var orders = await _ordersService.GetAllOrdersAsync(userId);
        return Ok(orders);
    }

    [Authorize]
    [HttpGet("{orderId:guid}")]
    public async Task<IActionResult> GetOrderById(Guid orderId)
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (!Guid.TryParse(userIdClaim, out var userId))
        {
            return Unauthorized();
        }

        var order = await _ordersService.GetOrderByIdAsync(orderId, userId);

        if (order is null)
        {
            return NotFound();
        }

        return Ok(order);
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> CreateOrder()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (!Guid.TryParse(userIdClaim, out var userId))
        {
            return Unauthorized();
        }
        
        var order = await _ordersService.CreateOrderAsync(userId);

        if (order is null)
        {
            return NotFound();
        }

        return CreatedAtAction(nameof(GetOrderById), new {orderId = order.Id}, order);
    }

    [Authorize]
    [HttpPatch("{orderId:guid}")]
    public async Task<IActionResult> CancelOrder(Guid orderId)
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (!Guid.TryParse(userIdClaim, out var userId))
        {
            return Unauthorized();
        }
        var order = await _ordersService.CancelOrderAsync(orderId, userId);

        if (order is null)
        {
            return NotFound();
        }

        return Ok(order);
    }
}