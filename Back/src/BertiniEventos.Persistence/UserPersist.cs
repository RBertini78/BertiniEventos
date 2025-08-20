using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BertiniEventos.Domain.Identity;
using BertiniEventos.Persistence.Contexto;
using BertiniEventos.Persistence.Contratos;
using Microsoft.EntityFrameworkCore;

namespace BertiniEventos.Persistence
{
    public class UserPersist : GeralPersist, IUserPersist
    {
        private readonly BertiniEventosContext _context;
        public UserPersist(BertiniEventosContext context) : base(context)
        {
            _context = context;
        }

        // Implementation of IUserPersist methods would go here
        public async Task<IEnumerable<User>> GetUsersAsync()
        {
           return await _context.Users.ToListAsync();
        }

        public async Task<User> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<User> GetUserByUserNameAsync(string userName)
        {
            return await _context.Users.SingleOrDefaultAsync(user => user.UserName == userName.ToLower());
        }
        
    }
    
}