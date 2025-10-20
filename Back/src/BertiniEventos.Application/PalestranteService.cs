using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BertiniEventos.Application.Contratos;
using BertiniEventos.Application.Dtos;
using BertiniEventos.Domain;
using BertiniEventos.Persistence.Contratos;
using AutoMapper;
using BertiniEventos.Persistence.Models;

namespace BertiniEventos.Application
{
    public class PalestranteService : IPalestranteService
    {        
        private readonly IPalestrantePersist _palestrantePersist;
        private readonly IMapper _mapper;
        public PalestranteService( IPalestrantePersist palestrantePersist, IMapper mapper)
        {            
            _palestrantePersist = palestrantePersist;
            _mapper = mapper;
        }
        public async Task<PalestranteDto> AddPalestrante(int userId, PalestranteAddDto model)
        {
           try
           {
               var Palestrante = _mapper.Map<Palestrante>(model);
               Palestrante.UserId = userId;

               _palestrantePersist.Add(Palestrante);

               if (await _palestrantePersist.SaveChangesAsync())
               {
                var retorno = await _palestrantePersist.GetPalestranteByUserIdAsync(userId, false);
                   
                return _mapper.Map<PalestranteDto>(retorno);
               }
               return null;
           }
           catch (Exception ex)
           {
               throw new Exception(ex.Message);
           }
        }

        public async Task<PalestranteDto> UpdatePalestrante(int userId, PalestranteUpdateDto model)
        {
            try
            {
                var Palestrante = await _palestrantePersist.GetPalestranteByUserIdAsync(userId, false);
                if (Palestrante == null) return null;
                model.Id = Palestrante.Id;
                model.UserId = userId;
                _mapper.Map(model, Palestrante);
                _palestrantePersist.Update(Palestrante);
                if (await _palestrantePersist.SaveChangesAsync())
                {
                   var retorno = await _palestrantePersist.GetPalestranteByUserIdAsync(userId, false);
                   return _mapper.Map<PalestranteDto>(retorno);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }            
        }
        
        public async Task<PageList<PalestranteDto>> GetAllPalestrantesAsync(PageParams pageParams, bool includeEventos = false)
        {
            try
            {
                var Palestrantes = await _palestrantePersist.GetAllPalestrantesAsync( pageParams, includeEventos);
                if (Palestrantes == null) return null;
                var resultado = _mapper.Map<PageList<PalestranteDto>>(Palestrantes);
                resultado.CurrentPage = Palestrantes.CurrentPage;
                resultado.TotalPages = Palestrantes.TotalPages;
                resultado.PageSize = Palestrantes.PageSize;
                resultado.TotalCount = Palestrantes.TotalCount;
                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        
        public async Task<PalestranteDto> GetPalestranteByUserIdAsync(int userId, bool includeEventos = false)
        {
            try
            {
                var Palestrante = await _palestrantePersist.GetPalestranteByUserIdAsync(userId,  includeEventos);
                if (Palestrante == null) return null;
                var resultado = _mapper.Map<PalestranteDto>(Palestrante);
                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        

    }
}