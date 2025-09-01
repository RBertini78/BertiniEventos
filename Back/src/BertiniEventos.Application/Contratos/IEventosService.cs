using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BertiniEventos.Application.Dtos;


namespace BertiniEventos.Application.Contratos
{
    public interface IEventosService
    {
       Task<EventoDto> AddEventos(int userId, EventoDto model);
       Task<EventoDto> UpdateEventos(int userId, int eventoId, EventoDto model);
       Task<bool>DeleteEventos(int userId, int eventoId);

       Task<EventoDto[]> GetAllEventosAsync(int userId, bool includePalestrantes = false);
       Task<EventoDto[]> GetAllEventosByTemaAsync(int userId, string tema, bool includePalestrantes = false);
       Task<EventoDto> GetEventosByIdAsync(int userId, int eventoId, bool includePalestrantes = false);
    }
}