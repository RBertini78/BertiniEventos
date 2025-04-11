using System;
 using System.Collections.Generic;
 using System.Linq;
 using System.Threading.Tasks;
using BertiniEventos.API.Models;
using Microsoft.AspNetCore.Mvc;
 using Microsoft.Extensions.Logging;
 
 namespace BertiniEventos.API.Controllers
 {
     [ApiController]
     [Route("api/[controller]")]
     public class EventoController : ControllerBase
     {
        public IEnumerable<Evento> _evento = new Evento[] 
             {
                 new Evento()
                 {
                     EventoId = 1,
                     Local = "São Paulo",
                     DataEvento = DateTime.Now.AddDays(20).ToString("dd/MM/yyyy"),
                     Tema = "Aprendendo ASP.NET Core",
                     QtdPessoas = 250,
                     Lote = "1º Lote",
                     ImagemURL = "foto.png"
                 },
                 new Evento()
                 {
                     EventoId = 2,
                     Local = "Rio de Janeiro",
                     DataEvento = DateTime.Now.AddDays(30).ToString("dd/MM/yyyy"),
                     Tema = "Aprendendo ASP.NET Core",
                     QtdPessoas = 300,
                     Lote = "2º Lote",
                     ImagemURL = "foto.png"
                 }
             };
                  
         public EventoController()
         {
         }
 
         [HttpGet]
         public IEnumerable<Evento> Get()
         {
             return _evento;
         }

         [HttpGet("{id}")]
         public IEnumerable<Evento> GetById(int id)
         {
             return _evento.Where(evento => evento.EventoId == id);
         }

         [HttpPost]
         public string Post()
         {
             return "Exemplo Post";
         } 
 
         [HttpPut]
         public string Put()
         {
             return "Exemplo Put";
         } 
         [HttpDelete]
         public string Delete()
         {
             return "Exemplo Delete";
        }
    }
 }