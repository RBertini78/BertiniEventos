using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BertiniEventos.Domain;
using BertiniEventos.Persistence.Contratos;
using BertiniEventos.Persistence.Contexto;

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
        public async Task<Evento[]> GetAllEventosByTemaAsync(string tema, bool includePalestrantes = false)
        {
            IQueryable<Evento> query = _context.Eventos.Include(e => e.Lotes).Include(e => e.RedesSociais);            

            if(includePalestrantes)
            {
                query = query.Include(e => e.PalestrantesEventos).ThenInclude(pe => pe.Palestrante);
            }

            query = query.AsNoTracking().OrderBy(e => e.Id).Where(e => e.Tema.ToLower().Contains(tema.ToLower()));
            return await query.ToArrayAsync();
        }
        public async Task<Evento[]> GetAllEventosAsync(bool includePalestrantes = false)
        {
            IQueryable<Evento> query = _context.Eventos.Include(e => e.Lotes).Include(e => e.RedesSociais);            

            if(includePalestrantes)
            {
                query = query.Include(e => e.PalestrantesEventos).ThenInclude(pe => pe.Palestrante);
            }

            query = query.AsNoTracking().OrderBy(e => e.Id);
            return await query.ToArrayAsync();
        }
        public async Task<Evento> GetEventosByIdAsync(int eventoId, bool includePalestrantes = false)
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
                        .Where(e => e.Id == eventoId);

            return await query.FirstOrDefaultAsync();
        }
        
    }
    
}