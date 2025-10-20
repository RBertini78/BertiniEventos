using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BertiniEventos.Application.Dtos;
using BertiniEventos.Persistence.Models;


namespace BertiniEventos.Application.Contratos
{
    public interface IPalestranteService
    {
       Task<PalestranteDto> AddPalestrante(int userId, PalestranteAddDto model);
       Task<PalestranteDto> UpdatePalestrante(int userId,  PalestranteUpdateDto model);
       
       Task<PageList<PalestranteDto>> GetAllPalestrantesAsync( PageParams pageParams, bool includeEventos = false);
       Task<PalestranteDto> GetPalestranteByUserIdAsync(int userId, bool includeEventos = false);
    }
}