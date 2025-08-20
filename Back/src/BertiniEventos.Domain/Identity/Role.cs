using Microsoft.AspNetCore.Identity;

namespace BertiniEventos.Domain.Identity
{
    public class Role : IdentityRole<int>
    {
        public List<UserRole> UserRoles { get; set; }
    }
}