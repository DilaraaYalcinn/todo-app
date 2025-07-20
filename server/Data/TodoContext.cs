using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Data;

public class TodoContext : DbContext
{
    public TodoContext(DbContextOptions<TodoContext> options) : base(options) { }

    public DbSet<TodoTask> Tasks => Set<TodoTask>();
}
