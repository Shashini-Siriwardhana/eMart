using System.Net;
using OrderService.DTOs;

namespace OrderService.Clients;

public interface IProductApiClient
{
    Task<ProductDto?> GetProductByIdAsync(Guid productId);
    Task<ProductDto?> ReserveStockAsync(Guid productId, int quantity);
    Task<ProductDto?> ReleaseStockAsync(Guid productId, int quantity);
}