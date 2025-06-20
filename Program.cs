using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Team_Project_Meta.Data;
using Team_Project_Meta.DTOs.Products;
using Team_Project_Meta.Services;
using Team_Project_Meta.Services.Auth;
using Team_Project_Meta.Services.Cart;
using Team_Project_Meta.Services.CartItem;
using Team_Project_Meta.Services.Categories;
using Team_Project_Meta.Services.DeliveryServices;
using Team_Project_Meta.Services.FavoritesProducts;
using Team_Project_Meta.Services.Notification;
using Team_Project_Meta.Services.Order;
using Team_Project_Meta.Services.Products;
using Team_Project_Meta.Services.Reviews;
using Team_Project_Meta.Services.Users;

var builder = WebApplication.CreateBuilder(args);

// Ïîäêëþ÷åíèå ê PostgreSQL
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Äîáàâëåíèå ñåðâèñîâ
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new() { Title = "PetCare API", Version = "v1" });

    // Äîáàâëÿåì ïîääåðæêó JWT
    options.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = Microsoft.OpenApi.Models.SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = Microsoft.OpenApi.Models.ParameterLocation.Header,
        Description = "Ââåäèòå òîêåí"
    });

    options.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
    {
        {
            new Microsoft.OpenApi.Models.OpenApiSecurityScheme
            {
                Reference = new Microsoft.OpenApi.Models.OpenApiReference
                {
                    Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});


builder.Services.AddScoped<IProductsService, ProductsService>();
builder.Services.AddScoped<IUsersService, UsersService>();
builder.Services.AddScoped<ICartService, CartService>();
builder.Services.AddScoped<ICartItemService, CartItemService>();
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<IFavoritesProductsService, FavoritesProductsService>();
builder.Services.AddScoped<DeliveryServicesService>();
builder.Services.AddHostedService<OrderStatusUpdater>();
builder.Services.AddScoped<ICategoriesService, CategoriesService>();
builder.Services.AddScoped<JwtService>();
builder.Services.AddScoped<UsersService>();
builder.Services.AddScoped<IReviewService, ReviewService>();
builder.Services.AddScoped<INotificationService, NotificationService>();



builder.Services.AddAuthentication("Bearer")
    .AddJwtBearer("Bearer", options =>
    {
        var config = builder.Configuration;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = config["Jwt:Issuer"],
            ValidAudience = config["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(config["Jwt:Key"]!)
            )
        };
    });

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:3000") // или твой порт фронта
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});


var app = builder.Build();

// Èñïîëüçîâàíèå Swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseDeveloperExceptionPage();
}

// Îáðàáîòêà HTTP-çàïðîñîâ
app.UseHttpsRedirection();

app.UseRouting();
app.UseCors("AllowAll");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
