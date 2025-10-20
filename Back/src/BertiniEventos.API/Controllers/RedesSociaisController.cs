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
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using BertiniEventos.API.Extensions;

namespace BertiniEventos.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class RedesSociaisController : ControllerBase
    {
        private readonly IRedeSocialService _redeSocialService;
        private readonly IEventosService _eventosService;
        private readonly IMapper _mapper;
        private readonly IPalestranteService _palestranteService;

        public RedesSociaisController(IRedeSocialService RedeSolcialService,
                                      IEventosService eventosService,
                                      IPalestranteService palestranteService,
                                      IMapper mapper)
        {
            _palestranteService = palestranteService;
            _redeSocialService = RedeSolcialService;
            _eventosService = eventosService;
            _mapper = mapper;
        }

        [HttpGet("evento/{eventoId}")]
        public async Task<IActionResult> GetByEvento(int eventoId)
        {
            try
            {
                if (await AutorEvento(eventoId) == false)
                    return Unauthorized();
                var redeSocial = await _redeSocialService.GetAllByEventoIdAsync(eventoId);
                if (redeSocial == null) return NoContent();

                return Ok(redeSocial);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar recuperar redes sociais. Erro: {ex.Message}");
            }
        }

        [HttpGet("palestrante")]
        public async Task<IActionResult> GetByPalestrante(int eventoId)
        {
            try
            {
                var palestrante = await _palestranteService.GetPalestranteByUserIdAsync(User.GetUserID(), true);

                if (palestrante == null) return Unauthorized();

                
                var redeSocial = await _redeSocialService.GetAllByPalestranteIdAsync(palestrante.Id);
                if (redeSocial == null) return NoContent();

                return Ok(redeSocial);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar recuperar redes sociais. Erro: {ex.Message}");
            }
        }



        [HttpPut("evento/{eventoId}")]
        public async Task<IActionResult> SaveByEvento(int eventoId, RedeSocialDto[] models)
        {
            try
            {
                if (await AutorEvento(eventoId) == false)
                    return Unauthorized();

                var redeSocial = await _redeSocialService.SaveByEvento(eventoId, models);
                if (redeSocial == null)
                    return BadRequest("Erro ao tentar atualizar rede social.");

                return Ok(redeSocial);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar editar rede social do evento. Erro: {ex.Message}");
            }
        }
        
        [HttpPut("palestrante")]
        public async Task<IActionResult> SaveByPalestrante(RedeSocialDto[] models)
        {
            try
            {
                var palestrante = await _palestranteService.GetPalestranteByUserIdAsync(User.GetUserID(), true);
                if (palestrante == null) return Unauthorized();

                var redeSocial = await _redeSocialService.SaveByPalestrante(palestrante.Id, models);
                if (redeSocial == null)
                    return BadRequest("Erro ao tentar atualizar rede social.");

                return Ok(redeSocial);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar editar rede social do palestrante. Erro: {ex.Message}");
            }
        }

        [HttpDelete("evento/{eventoId}/{redeSocialId}")]
        public async Task<IActionResult> DeleteByEvento(int eventoId, int redeSocialId)
        {
            try
            {
                if (await AutorEvento(eventoId) == false)
                    return Unauthorized();

                var RedeSocial = await _redeSocialService.GetRedeSocialEventoByIdsAsync(eventoId, redeSocialId);
                if (RedeSocial == null)
                    return NoContent();

                return await _redeSocialService.DeleteByEvento(eventoId, redeSocialId)
                    ? Ok(new { message = "Rede Social Deletada." })
                    : throw new Exception("Ocorreu um problema não específico ao tentar deletar Rede Social.");

            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar excluir Rede Social. Erro: {ex.Message}");
            }
        }

        [HttpDelete("palestrante/{redeSocialId}")]
        public async Task<IActionResult> DeleteByPalestrante(int redeSocialId)
        {
            try
            {
                var palestrante = await _palestranteService.GetPalestranteByUserIdAsync(User.GetUserID(), true);
                if (palestrante == null) return Unauthorized();

                var RedeSocial = await _redeSocialService.GetRedeSocialPalestranteByIdsAsync(palestrante.Id, redeSocialId);
                if (RedeSocial == null)
                    return NoContent();

                return await _redeSocialService.DeleteByPalestrante(palestrante.Id, redeSocialId)
                    ? Ok(new { message = "Rede Social Deletada." })
                    : throw new Exception("Ocorreu um problema não específico ao tentar deletar Rede Social.");

            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar excluir Rede Social. Erro: {ex.Message}");
            }
        }

        [NonAction]
        private async Task<bool> AutorEvento(int eventoId)
        {
            var evento = await _eventosService.GetEventosByIdAsync(User.GetUserID(), eventoId, false);
            if (evento == null) return false;

            return true;
        }
    }
}

