using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BertiniEventos.Domain;

namespace BertiniEventos.Persistence.Contratos
{
    public interface IPalestrantePersist : IGeralPersist
    {
        Task<Palestrante[]> GetAllPalestrantesByNomeAsync(string nome, bool includeEventos);
        Task<Palestrante[]> GetAllPalestrantesAsync(bool includeEventos);
        Task<Palestrante> GetPalestrantesByIdAsync(int palestranteId, bool includeEventos);
    }
}