using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BertiniEventos.Domain;

namespace BertiniEventos.Persistence.Contratos
{
    public interface ILotePersist : IGeralPersist
    {
        /// <summary>
        /// Método que retorna todos os lotes por eventoId
        /// </summary>
        /// <param name="eventoId"></param>
        /// <returns>Todos os lotes</returns>
        Task<Lote[]> GetLotesByEventoIdAsync(int eventoId);
        
        /// <summary>
        /// Método que retorna um lote por eventoId e loteId
        /// </summary>
        /// <param name="eventoId"></param>
        /// <param name="loteId"></param>
        /// <returns>Apenas 1 lote</returns>
        Task<Lote> GetLoteByIdsAsync(int eventoId, int loteId);        
    }
}