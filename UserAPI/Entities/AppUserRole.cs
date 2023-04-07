using Microsoft.AspNetCore.Identity;

namespace UserAPI.Entities
{
    public class AppUserRole : IdentityUserRole<Guid>
    {
        public AppUser AppUser { get; set; }
        public AppRole AppRole { get; set; }
    }
}
