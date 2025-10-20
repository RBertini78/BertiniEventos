using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BertiniEventos.Domain;
using BertiniEventos.Persistence.Contexto;
using BertiniEventos.Persistence.Contratos;
using Microsoft.EntityFrameworkCore;

namespace BertiniEventos.Persistence
{
    public class RedeSocialPersist : GeralPersist, IRedeSocialPersist
    {
        private readonly BertiniEventosContext _context;

        public RedeSocialPersist(BertiniEventosContext context) :base(context)
        {
            _context = context;
        }
        public async Task<RedeSocial> GetRedeSocialEventosByIdsAsync(int eventoId, int id)
        {
            IQueryable<RedeSocial> query = _context.RedesSociais;
            query = query.AsNoTracking()            
                        .Where(rs => rs.EventoId == eventoId && rs.Id == id);
            return await query.FirstOrDefaultAsync();
        }
        public async Task<RedeSocial> GetRedeSocialPalestranteByIdsAsync(int paletranteId, int id)
        {
            IQueryable<RedeSocial> query = _context.RedesSociais;
            query = query.AsNoTracking()            
                        .Where(rs => rs.PalestranteId == paletranteId && rs.Id == id);
            return await query.FirstOrDefaultAsync();
        }
        public async Task<RedeSocial[]> GetAllByEventoIdAsync(int eventoId)
        {
            IQueryable<RedeSocial> query = _context.RedesSociais;
            query = query.AsNoTracking()            
                        .Where(rs => rs.EventoId == eventoId);
            return await query.ToArrayAsync();
        }
        public async Task<RedeSocial[]> GetAllByPalestranteIdAsync(int palestranteId)
        {
            IQueryable<RedeSocial> query = _context.RedesSociais;
            query = query.AsNoTracking()            
                        .Where(rs => rs.PalestranteId == palestranteId);
            return await query.ToArrayAsync();
        }
    }
}