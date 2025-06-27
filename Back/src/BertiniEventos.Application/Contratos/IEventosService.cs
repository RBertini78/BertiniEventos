using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BertiniEventos.Application.Dtos;


namespace BertiniEventos.Application.Contratos
{
    public interface IEventosService
    {
       Task<EventoDto> AddEventos(EventoDto model);
       Task<EventoDto> UpdateEventos(int eventoId, EventoDto model);
       Task<bool>DeleteEventos(int eventoId);

       Task<EventoDto[]> GetAllEventosAsync(bool includePalestrantes = false);
       Task<EventoDto[]> GetAllEventosByTemaAsync(string tema, bool includePalestrantes = false);
       Task<EventoDto> GetEventosByIdAsync(int eventoId, bool includePalestrantes = false);
    }
}