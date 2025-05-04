using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BertiniEventos.Domain;

namespace BertiniEventos.Persistence.Contratos
{
    public interface IEventoPersist : IGeralPersist
    {

        Task<Evento[]> GetAllEventosByTemaAsync(string tema, bool includePalestrantes = false);
        Task<Evento[]> GetAllEventosAsync(bool includePalestrantes = false);
        Task<Evento> GetEventosByIdAsync(int eventoId, bool includePalestrantes = false);        
    }
}