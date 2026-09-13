using System.Net;
using OrderService.DTOs;

namespace OrderService.Clients;

public class ProductApiClient : IProductApiClient
{
    private readonly HttpClient _httpClient;

    public ProductApiClient(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<ProductDto?> GetProductByIdAsync(Guid productId)
    {
        var response = await _httpClient.GetAsync(
            $"api/products/{productId}"
        );

        if (response.StatusCode == HttpStatusCode.NotFound)
        {
            return null;
        }

        response.EnsureSuccessStatusCode();

        return await response.Content.ReadFromJsonAsync<ProductDto>();
    }

    public async Task<ProductDto?> ReserveStockAsync(Guid productId, int quantity)
    {
        var response = await _httpClient.PostAsJsonAsync(
            $"api/products/{productId}/reserve-stock",
            new ReduceStockDto
            {
                Quantity = quantity
            });

        response.EnsureSuccessStatusCode();
        return await response.Content.ReadFromJsonAsync<ProductDto>();
    }

    public async Task<ProductDto?> ReleaseStockAsync(Guid productId, int quantity)
    {
        var response = await _httpClient.PostAsJsonAsync(
            $"api/products/{productId}/release-stock",
            new ReduceStockDto
            {
                Quantity = quantity
            });

        response.EnsureSuccessStatusCode();
        return await response.Content.ReadFromJsonAsync<ProductDto>();
    }
}