using System.Net;
using OrderService.DTOs;

namespace OrderService.Clients;

public interface ICartApiClient
{
    Task<CartDto?> GetCartItemsAsync();
    Task<bool> ClearCartAsync();
}