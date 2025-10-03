using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BertiniEventos.Domain;
using BertiniEventos.Persistence.Models;

namespace BertiniEventos.Persistence.Contratos
{
    public interface IEventoPersist : IGeralPersist
    {
        
        Task<PageList<Evento>> GetAllEventosAsync(int userID, PageParams pageParams, bool includePalestrantes = false);
        Task<Evento> GetEventosByIdAsync(int userID, int eventoId, bool includePalestrantes = false);        
    }
}