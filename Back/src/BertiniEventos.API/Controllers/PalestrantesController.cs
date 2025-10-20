using BertiniEventos.Application;
using BertiniEventos.Application.Contratos;
using BertiniEventos.Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using BertiniEventos.Application.Dtos;
using AutoMapper;
using System.IO;
using BertiniEventos.API.Extensions;
using Microsoft.AspNetCore.Authorization;
using BertiniEventos.Persistence.Models;

namespace BertiniEventos.API.Controllers
{
    [Authorize]    
    [ApiController]
    [Route("api/[controller]")]
    public class PalestrantesController : ControllerBase
    {
        private readonly IPalestranteService _palestranteService;
        private readonly IWebHostEnvironment _hostEnvironment;
        private readonly IMapper _mapper;
        private readonly IAccountService _accountService;

        public PalestrantesController(IPalestranteService palestranteService, IWebHostEnvironment hostEnvironment, IMapper mapper, IAccountService accountService)
        {
            _palestranteService = palestranteService;
            _hostEnvironment = hostEnvironment;
            _mapper = mapper;
            _accountService = accountService;
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAll([FromQuery]PageParams pageParams)
        {
            try
            {
                var palestrantes = await _palestranteService.GetAllPalestrantesAsync( pageParams, true);
                if (palestrantes == null || !palestrantes.Any())
                    return NotFound("Nenhum palestrante encontrado.");

                var palestrantesRetorno = _mapper.Map<List<PalestranteDto>>(palestrantes);

                Response.AddPagination(palestrantes.CurrentPage, palestrantes.PageSize, palestrantes.TotalCount, palestrantes.TotalPages);

                return Ok(palestrantesRetorno);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar recuperar palestrantess. Erro: {ex.Message}");
            }
        }

        [HttpGet()]
        public async Task<IActionResult> GetPalestrantes()
        {
            try
            {
                var palestrante = await _palestranteService.GetPalestranteByUserIdAsync(User.GetUserID(), true);
                if (palestrante == null)
                    return NoContent();

                return Ok(palestrante);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar recuperar palestrantes. Erro: {ex.Message}");
            }
        }

        

        [HttpPost]
        public async Task<IActionResult> Post(PalestranteAddDto model)
        {
            try
            {
                var palestrante = await _palestranteService.GetPalestranteByUserIdAsync(User.GetUserID(), false);
                
                if (palestrante == null)
                    palestrante = await _palestranteService.AddPalestrante(User.GetUserID(), model);                    

                return Ok(palestrante);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar adicionar palestrantes. Erro: {ex.Message}");
            }
        }

        
        [HttpPut]
        public async Task<IActionResult> Put( PalestranteUpdateDto model)
        {
            try
            {
                var palestrante = await _palestranteService.UpdatePalestrante(User.GetUserID(), model);
                if (palestrante == null)
                    return BadRequest("Erro ao tentar atualizar palestrante.");

                return Ok(palestrante);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar editar palestrantes. Erro: {ex.Message}");
            }
        }
        
    }
}

