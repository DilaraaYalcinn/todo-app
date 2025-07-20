using Microsoft.EntityFrameworkCore;
using Server.Data;

var builder = WebApplication.CreateBuilder(args);

// EF Core - SQLite connection
builder.Services.AddDbContext<TodoContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("TodoDb")));

builder.Services.AddCors(); // CORS allowance for the Frontend

builder.Services.AddControllers();
var app = builder.Build();

app.UseHttpsRedirection();
app.UseCors(policy =>
    policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());

app.MapControllers();
app.Run();
