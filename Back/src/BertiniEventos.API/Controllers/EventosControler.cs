using BertiniEventos.Application;
using BertiniEventos.Application.Contratos;
using BertiniEventos.Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using BertiniEventos.Application.Dtos;

namespace BertiniEventos.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventosController : ControllerBase
    {
        private readonly IEventosService _eventoService;

        public EventosController(IEventosService eventoService)
        {
            _eventoService = eventoService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var eventos = await _eventoService.GetAllEventosAsync(true);
                if (eventos == null || !eventos.Any())
                    return NotFound("Nenhum evento encontrado.");
                    
                    var eventosRetorno = new List<EventoDto>();

                    foreach (var evento in eventos)
                    {
                        eventosRetorno.Add(new EventoDto(evento)
                        {
                            Id = evento.Id,
                            Local = evento.Local,
                            DataEvento = evento.DataEvento.ToString(),
                            Tema = evento.Tema,
                            QtdPessoas = evento.QtdPessoas,
                            Lote = evento.Lote,
                            ImagemURL = evento.ImagemURL,
                        });
                    }

                return Ok(eventosRetorno);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar recuperar eventos. Erro: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var evento = await _eventoService.GetEventosByIdAsync(id, true);
                if (evento == null)
                    return NoContent();

                return Ok(evento);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar recuperar eventos. Erro: {ex.Message}");
            }
        }

        [HttpGet("{tema}/tema")]
        public async Task<IActionResult> GetByTema(string tema)
        {
            try
            {
                var eventos = await _eventoService.GetAllEventosByTemaAsync(tema, true);
                if (eventos == null || !eventos.Any())
                    return NotFound("Nenhum evento encontrado.");

                return Ok(eventos);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar recuperar eventos. Erro: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(EventoDto model)
        {
            try
            {
                var evento = await _eventoService.AddEventos(model);
                if (evento == null)
                    return BadRequest("Erro ao tentar adicionar evento.");

                return Ok(evento);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar adicionar eventos. Erro: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, EventoDto model)
        {
            try
            {
                var evento = await _eventoService.UpdateEventos(id, model);
                if (evento == null)
                    return BadRequest("Erro ao tentar atualizar evento.");

                return Ok(evento);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar editar eventos. Erro: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                if (await _eventoService.DeleteEventos(id))
                    return Ok("Evento excluído com sucesso.");
                else
                    return BadRequest("Erro ao tentar excluir evento.");
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar excluir eventos. Erro: {ex.Message}");
            }
        }
    }
}

