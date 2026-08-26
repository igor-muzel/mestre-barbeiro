using Microsoft.EntityFrameworkCore;
using backend.Models; // Puxando a classe Usuario que acabamos de criar

namespace backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Usuario> Usuarios {get; set;}
    }
}