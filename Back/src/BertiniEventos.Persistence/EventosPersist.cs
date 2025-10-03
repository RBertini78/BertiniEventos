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
    public class EventosPersist : GeralPersist, IEventoPersist
    {
        private readonly BertiniEventosContext _context; 
        public EventosPersist(BertiniEventosContext context) : base(context)
        {
            _context = context;
            //_context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }
        
        public async Task<PageList<Evento>> GetAllEventosAsync(int userID, PageParams pageParams, bool includePalestrantes = false)
        {
            IQueryable<Evento> query = _context.Eventos.Include(e => e.Lotes).Include(e => e.RedesSociais);            

            if(includePalestrantes)
            {
                query = query.Include(e => e.PalestrantesEventos).ThenInclude(pe => pe.Palestrante);
            }

            query = query.AsNoTracking()
                .Where(e => (e.Tema.ToLower().Contains(pageParams.Term.ToLower())
                || (e.Local.ToLower().Contains(pageParams.Term.ToLower())))
                && (e.UserId == userID))                
                .OrderBy(e => e.Id);
            return await PageList<Evento>.CreateAsync(query, pageParams.PageNumber, pageParams.PageSize);
        }
        public async Task<Evento> GetEventosByIdAsync(int userID, int eventoId, bool includePalestrantes = false)
        {
            IQueryable<Evento> query = _context.Eventos
                .Include(e => e.Lotes)
                .Include(e => e.RedesSociais);

            if(includePalestrantes)
            {
                query = query
                    .Include(e => e.PalestrantesEventos)
                    .ThenInclude(pe => pe.Palestrante);
            }

            query = query.AsNoTracking().OrderBy(e => e.Id)
                        .Where(e => e.Id == eventoId && e.UserId == userID);

            return await query.FirstOrDefaultAsync();
        }
        
    }
    
}