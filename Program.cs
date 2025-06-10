using Microsoft.EntityFrameworkCore;
using Team_Project_Meta.Data;

var builder = WebApplication.CreateBuilder(args);

// Подключение к PostgreSQL
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Добавление сервисов
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Использование Swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Обработка HTTP-запросов
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
