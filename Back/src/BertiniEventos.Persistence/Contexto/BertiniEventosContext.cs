using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BertiniEventos.Domain;
using Microsoft.EntityFrameworkCore;

namespace BertiniEventos.Persistence.Contexto
{
    public class BertiniEventosContext : DbContext
    {
        public BertiniEventosContext(DbContextOptions<BertiniEventosContext> options) : base(options)
        {

        }
        public DbSet<Evento> Eventos { get; set; }
        public DbSet<Lote> Lotes { get; set; }
        public DbSet<Palestrante> Palestrantes { get; set; }
        public DbSet<PalestranteEvento> PalestrantesEventos { get; set; }
        public DbSet<RedeSocial> RedesSociais { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PalestranteEvento>()
                .HasKey(pe => new { pe.EventoId, pe.PalestranteId });

            modelBuilder.Entity<Evento>()
                .HasMany(e => e.RedesSociais)
                .WithOne(rs => rs.Evento)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Palestrante>()
                .HasMany(p => p.RedesSociais)
                .WithOne(rs => rs.Palestrante)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}