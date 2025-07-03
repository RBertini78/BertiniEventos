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
    public class LotePersist : GeralPersist, ILotePersist
    {
        private readonly BertiniEventosContext _context; 
        public LotePersist(BertiniEventosContext context) : base(context)
        {
            _context = context;
           
        }
        
        public async Task<Lote> GetLoteByIdsAsync(int eventoId, int id)
        {
            IQueryable<Lote> query = _context.Lotes;
            query = query.AsNoTracking().Where(lote => lote.EventoId == eventoId && lote.Id == id);
            return await query.FirstOrDefaultAsync();
        }
        public async Task<Lote[]> GetLotesByEventoIdAsync(int eventoId)
        {
            IQueryable<Lote> query = _context.Lotes;
            query = query.AsNoTracking().Where(lote => lote.EventoId == eventoId);
            return await query.ToArrayAsync();
        }
        
        
    }
    
}