using GPBack.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace GPBack.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // One to Many Relationship
            builder.Entity<Match>()
                .HasOne<ApplicationUser>(s => s.User)
                .WithMany(g => g.Matches)
                .HasForeignKey(s => s.UserId);
        }
        //public DbSet<ApplicationUser> Users { get; set; }
        public virtual DbSet<Match> Matches { get; set; }
    }
}
