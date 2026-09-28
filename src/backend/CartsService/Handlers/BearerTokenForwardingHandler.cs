using System.Net.Http.Headers;

namespace CartsService.Handlers;

public class BearerTokenForwardingHandler(
    IHttpContextAccessor httpContextAccessor) : DelegatingHandler
{
    protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
    {
        var httpContext = httpContextAccessor.HttpContext;
        var authorization = httpContext?
                                    .Request
                                    .Headers
                                    .Authorization
                                    .FirstOrDefault();

        if (!string.IsNullOrWhiteSpace(authorization))
        {
            request.Headers.Authorization = AuthenticationHeaderValue.Parse(authorization);
        }

        return await base.SendAsync(request, cancellationToken);
    }
}