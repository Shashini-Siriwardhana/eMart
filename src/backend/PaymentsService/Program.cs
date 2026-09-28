using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using PaymentsService.Clients;
using PaymentsService.Data;
using PaymentsService.Factories;
using PaymentsService.Repositories;
using PaymentsService.Services;
using PaymentsService.Strategies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("PaymentsDB");

builder.Services.AddDbContext<PaymentDbContext>(options => 
options.UseNpgsql(connectionString));

builder.Services.AddHttpContextAccessor();
builder.Services.AddTransient<BearerTokenForwardingHandler>();

builder.Services.AddHttpClient<IOrderApiClient, OrderApiClient>(
    client => client.BaseAddress = new Uri(
        builder.Configuration["Services:OrderService"]!
    ))
    .AddHttpMessageHandler<BearerTokenForwardingHandler>();

// Keep enums as int in DB and expose them as strings in API
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
builder.Services.AddScoped<IPaymentRepository, PaymentRepository>();
builder.Services.AddScoped<IPaymentService, PaymentService>();

builder.Services.AddScoped<CardPaymentStrategy>();
builder.Services.AddScoped<PayPalPaymentStrategy>();
builder.Services.AddScoped<CashOnDeliveryPaymentStrategy>();

builder.Services.AddScoped<IPaymentStrategyFactory, PaymentStrategyFactory>();

builder.Services.AddHealthChecks();

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
