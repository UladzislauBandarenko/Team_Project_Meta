using Microsoft.EntityFrameworkCore;
using Team_Project_Meta.Data;
using Team_Project_Meta.Services.Products;

var builder = WebApplication.CreateBuilder(args);

// ����������� � PostgreSQL
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// ���������� ��������
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IProductsService, ProductsService>();

var app = builder.Build();

// ������������� Swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// ��������� HTTP-��������
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
