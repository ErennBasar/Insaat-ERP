using InsaatERP.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace InsaatERP.Infrastructure;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
        
    }

    public DbSet<Project> Projects { get; set; }
    public DbSet<Contract> Contracts { get; set; }
    public DbSet<ProgressPayment> ProgressPayments { get; set; }
    public DbSet<GuaranteeLetter> GuaranteeLetters { get; set; }

    
}