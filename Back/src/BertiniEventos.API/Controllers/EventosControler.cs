using System;
 using System.Collections.Generic;
 using System.Linq;
 using System.Threading.Tasks;
using BertiniEventos.API.Data;
using BertiniEventos.API.Models;
using Microsoft.AspNetCore.Mvc;
 using Microsoft.Extensions.Logging;
 
 namespace BertiniEventos.API.Controllers
 {
     [ApiController]
     [Route("api/[controller]")]
     public class EventosController : ControllerBase
     {                          
         private readonly DataContext _context;
         public EventosController(DataContext context)
         {
              _context = context;
         }
         
 
         [HttpGet]
         public IEnumerable<Evento> Get()
         {
             return _context.Eventos;
         }

         [HttpGet("{id}")]
         public Evento GetById(int id)
         {
             return _context.Eventos.FirstOrDefault(evento => evento.EventoId == id);
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