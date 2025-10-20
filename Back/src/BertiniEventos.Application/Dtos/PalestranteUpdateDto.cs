using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Humanizer;

namespace BertiniEventos.Application.Dtos
{
    public class PalestranteUpdateDto
    {
        public int Id { get; set; }        
        public string MiniCurriculo { get; set; }        
        public int UserId { get; set; }        
    }
}