using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Data;
using UserAPI.Entities;

namespace UserAPI.Data
{
    public class IdentityContext : IdentityDbContext<AppUser, AppRole, Guid,
        IdentityUserClaim<Guid>, AppUserRole, IdentityUserLogin<Guid>,
        IdentityRoleClaim<Guid>, IdentityUserToken<Guid>>
    {

        public IdentityContext()
        {

        }
        public IdentityContext(DbContextOptions<IdentityContext> options) : base(options)
        {

        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseNpgsql("Server=localhost; Port=5432; User Id=postgres; Password=password; Database=UserAPI");
            }
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<AppUser>()
                .HasMany(ur => ur.AppUserRoles)
                .WithOne(u => u.AppUser)
                .HasForeignKey(ur => ur.UserId)
                .IsRequired();

            builder.Entity<AppRole>()
                .HasMany(ur => ur.AppUserRoles)
                .WithOne(u => u.AppRole)
                .HasForeignKey(ur => ur.RoleId)
                .IsRequired();
        }

    }
}
