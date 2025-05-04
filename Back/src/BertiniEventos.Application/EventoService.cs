using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BertiniEventos.Application.Contratos;
using BertiniEventos.Domain;
using BertiniEventos.Persistence.Contratos;

namespace BertiniEventos.Application
{
    public class EventoService : IEventosService
    {
        private readonly IGeralPersist _geralPersist;
        private readonly IEventoPersist _eventoPersist;
        public EventoService(IGeralPersist geralPersist, IEventoPersist eventoPersist)
        {
            _eventoPersist = eventoPersist;
            _geralPersist = geralPersist;  
        }
        public async Task<Evento> AddEventos(Evento model)
        {
           try
           {
               _geralPersist.Add<Evento>(model);
               if (await _geralPersist.SaveChangesAsync())
               {
                   return await _eventoPersist.GetEventosByIdAsync(model.Id, false);
               }
               return null;
           }
           catch (Exception ex)
           {
               throw new Exception(ex.Message);
           }
        }

        public async Task<Evento> UpdateEventos(int eventoId, Evento model)
        {
            try
            {
                var evento = await _eventoPersist.GetEventosByIdAsync(eventoId, false);
                if (evento == null) return null;
                model.Id = evento.Id;
                _geralPersist.Update<Evento>(model);
                if (await _geralPersist.SaveChangesAsync())
                {
                    return await _eventoPersist.GetEventosByIdAsync(model.Id, false);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }            
        }
        public async Task<bool> DeleteEventos(int eventoId)
        {
            try
            {
                var evento = await _eventoPersist.GetEventosByIdAsync(eventoId, false);
                if (evento == null) throw new Exception("Evento para delete não encontrado.");                
                _geralPersist.Delete<Evento>(evento);
                return await _geralPersist.SaveChangesAsync();               
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<Evento[]> GetAllEventosAsync(bool includePalestrantes = false)
        {
            try
            {
                var eventos = await _eventoPersist.GetAllEventosAsync(includePalestrantes);
                if (eventos == null) return null;
                return eventos;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<Evento[]> GetAllEventosByTemaAsync(string tema, bool includePalestrantes = false)
        {
            try
            {
                var eventos = await _eventoPersist.GetAllEventosByTemaAsync(tema, includePalestrantes);
                if (eventos == null) return null;
                return eventos;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<Evento> GetEventosByIdAsync(int eventoId, bool includePalestrantes = false)
        {
            try
            {
                var evento = await _eventoPersist.GetEventosByIdAsync(eventoId, includePalestrantes);
                if (evento == null) return null;
                return evento;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        

    }
}