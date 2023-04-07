using Microsoft.AspNetCore.Identity;

namespace UserAPI.Entities
{
    public class AppUser: IdentityUser<Guid>
    {
        public ICollection<AppUserRole> AppUserRoles { get; set; }
    }
}
