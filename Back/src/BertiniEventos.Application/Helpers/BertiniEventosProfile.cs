using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BertiniEventos.Application.Dtos;
using BertiniEventos.Domain;

namespace BertiniEventos.Application.Helpers
{
    public class BertiniEventosProfile : Profile
    {
        public BertiniEventosProfile()
        {
            CreateMap<Evento, EventoDto>().ReverseMap();
            CreateMap<Lote, LoteDto>().ReverseMap();
            CreateMap<RedeSocial, RedeSocialDto>().ReverseMap();
            CreateMap<Palestrante, PalestranteDto>().ReverseMap();
        }
    }
}