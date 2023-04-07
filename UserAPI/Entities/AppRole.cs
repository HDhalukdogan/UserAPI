using Microsoft.AspNetCore.Identity;

namespace UserAPI.Entities
{
    public class AppRole : IdentityRole<Guid>
    {
        public ICollection<AppUserRole> AppUserRoles { get; set; }
    }
}
