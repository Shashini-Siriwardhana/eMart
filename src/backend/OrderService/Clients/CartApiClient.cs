using System.Net;
using OrderService.DTOs;

namespace OrderService.Clients;

public class CartApiClient : ICartApiClient
{
    private readonly HttpClient _httpClient;

    public CartApiClient(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<CartDto?> GetCartItemsAsync()
    {
        var response = await _httpClient.GetAsync(
            $"api/cart/"
        );

        if (response.StatusCode == HttpStatusCode.NotFound)
        {
            return null;
        }

        response.EnsureSuccessStatusCode();

        return await response.Content.ReadFromJsonAsync<CartDto>();
    }

    public async Task<bool> ClearCartAsync()
    {
        var response = await _httpClient.DeleteAsync(
            $"api/cart/items"
        );

       return response.IsSuccessStatusCode;
    }
}