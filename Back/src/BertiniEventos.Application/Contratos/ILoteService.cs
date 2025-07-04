using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BertiniEventos.Application.Dtos;


namespace BertiniEventos.Application.Contratos
{
    public interface ILoteService
    {
      
       Task<LoteDto[]> SaveLote(int eventoId, LoteDto[] models);
       Task<bool> DeleteLote(int eventoId, int loteId);
       Task<LoteDto[]> GetLotesByEventoIdAsync(int eventoId);
       Task<LoteDto> GetLoteByIdAsync(int eventoId, int loteId);
    }
}