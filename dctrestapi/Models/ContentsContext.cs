using Microsoft.EntityFrameworkCore;
namespace dctrestapi.Models;

public class ContentsContext: DbContext{
    public ContentsContext(DbContextOptions<ContentsContext> options)
        : base(options)
    {
    }
    public DbSet<Content> Contents { get; set; } 
    public DbSet<Admin> Admins { get; set; }
}