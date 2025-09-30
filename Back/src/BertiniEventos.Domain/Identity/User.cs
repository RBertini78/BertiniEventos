using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BertiniEventos.Domain.Enum;
using Microsoft.AspNetCore.Identity;

namespace BertiniEventos.Domain.Identity
{
    public class User : IdentityUser<int>
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public Titulo Title { get; set; }
        public string? Description { get; set; }
        public Funcao Function { get; set; }
        public string? ImagemURL { get; set; }
        public IEnumerable<UserRole>? UserRoles { get; set; }
    }    
    
}