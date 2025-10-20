using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BertiniEventos.Domain;
using BertiniEventos.Persistence.Models;

namespace BertiniEventos.Persistence.Contratos
{
    public interface IPalestrantePersist : IGeralPersist
    {        
        Task<PageList<Palestrante>> GetAllPalestrantesAsync(PageParams pageParams, bool includeEventos = false);
        Task<Palestrante> GetPalestranteByUserIdAsync(int userId, bool includeEventos = false);
    }
}