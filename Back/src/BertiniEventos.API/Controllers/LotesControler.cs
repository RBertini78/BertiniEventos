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

namespace BertiniEventos.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LotesController : ControllerBase
    {
        private readonly ILoteService _loteService;
        private readonly IMapper _mapper;

        public LotesController(ILoteService LoteService)
        {
            _loteService = LoteService;           
        }

        [HttpGet("{eventoId}")]
        public async Task<IActionResult> Get(int eventoId)
        {
            try
            {
                var lotes = await _loteService.GetLotesByEventoIdAsync(eventoId);
                if (lotes == null || !lotes.Any())
                    return NotFound("Nenhum lote encontrado.");

                var lotesRetorno = _mapper.Map<List<LoteDto>>(lotes);
                return Ok(lotesRetorno);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar recuperar lotes. Erro: {ex.Message}");
            }
        }
          
        

        [HttpPut("{eventoId}")]
        public async Task<IActionResult> Put(int eventoId, LoteDto[] models)
        {
            try
            {
                var lote = await _loteService.SaveLote(eventoId, models);
                if (lote == null)
                    return BadRequest("Erro ao tentar atualizar lote.");

                return Ok(lote);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar editar lotes. Erro: {ex.Message}");
            }
        }

        [HttpDelete("{eventoId}/{loteId}")]
        public async Task<IActionResult> Delete(int eventoId, int loteId)
        {
            try
            {
                var lote = await _loteService.DeleteLote(eventoId, loteId)
                    ? Ok (new { message = "Deletado."})
                    : throw new Exception("Ocorreu um problema não específico ao tentar deletar Lote.");
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar excluir lotes. Erro: {ex.Message}");
            }
        }
    }
}

