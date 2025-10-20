using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BertiniEventos.Domain;
using BertiniEventos.Persistence.Contratos;
using BertiniEventos.Persistence.Contexto;
using BertiniEventos.Persistence.Models;

namespace BertiniEventos.Persistence
{
    public class PalestrantePersist : GeralPersist, IPalestrantePersist
    {
        private readonly BertiniEventosContext _context; 
        public PalestrantePersist(BertiniEventosContext context) : base(context)
        {
            _context = context;            
        }    
            
        
        public async Task<PageList<Palestrante>> GetAllPalestrantesAsync(PageParams pageParams, bool includeEventos = false)
        {
            IQueryable<Palestrante> query = _context.Palestrantes
                .Include(p => p.User)
                .Include(p => p.RedesSociais);

            if(includeEventos)
            {
                query = query
                    .Include(p => p.PalestrantesEventos)
                    .ThenInclude(pe => pe.Evento);
            }

            query = query.AsNoTracking()
                    .Where(p => (p.MiniCurriculo.ToLower().Contains(pageParams.Term.ToLower()) ||
                                p.User.FirstName.ToLower().Contains(pageParams.Term.ToLower()) ||
                                p.User.LastName.ToLower().Contains(pageParams.Term.ToLower())) &&
                                p.User.Function == Domain.Enum.Funcao.Palestrante)
                    .OrderBy(p => p.Id);

            return await PageList<Palestrante>.CreateAsync(query, pageParams.PageNumber, pageParams.PageSize);
        }
        public async Task<Palestrante> GetPalestranteByUserIdAsync(int userId, bool includeEventos)
        {
            IQueryable<Palestrante> query = _context.Palestrantes
                .Include(p => p.User)
                .Include(p => p.RedesSociais);

            if(includeEventos)
            {
                query = query
                    .Include(p => p.PalestrantesEventos)
                    .ThenInclude(pe => pe.Evento);
            }

            query = query.AsNoTracking().OrderBy(p => p.Id)
                        .Where(p => p.Id == userId);

            return await query.FirstOrDefaultAsync();
        }
        
    }
    
}