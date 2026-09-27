using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using OrderService.Clients;
using OrderService.Data;
using OrderService.Messaging;
using OrderService.Repositories;
using OrderService.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("OrdersDB");
builder.Services.AddDbContext<OrderDbContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddHttpClient<IProductApiClient, ProductApiClient>(
    client =>
    {
        client.BaseAddress = new Uri(
            builder.Configuration["Services:ProductService"]!
        );
    });

builder.Services.AddHttpClient<ICartApiClient, CartApiClient>(
    client =>
    {
        client.BaseAddress = new Uri(
            builder.Configuration["Services:CartsService"]!
        );
    });

builder.Services
.AddControllers()
.AddJsonOptions(options =>
{
    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,

        ValidIssuer = builder.Configuration["AppSettings:Issuer"],
        ValidAudience = builder.Configuration["AppSettings:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["AppSettings:Token"]!)),
        RoleClaimType = ClaimTypes.Role
    };
});

// Add services to the container.
builder.Services.AddOpenApi();

builder.Services.AddScoped<IOrdersService, OrdersService>();
builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddScoped<IEventPublisher, RabbitMqEventPublisher>();

builder.Services.AddHealthChecks();
builder.Services.AddAuthorization();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.MapControllers();
app.MapHealthChecks("/health");
app.UseAuthentication();
app.UseAuthorization();

app.Run();
