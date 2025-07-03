using BertiniEventos.Application;
using BertiniEventos.Application.Contratos;
using BertiniEventos.Persistence.Contratos;
using BertiniEventos.Persistence;
using BertiniEventos.Persistence.Contexto;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

namespace BertiniEventos.API
 {
     public class Startup
     {
         public Startup(IConfiguration configuration)
         {
             Configuration = configuration;
         }
 
         public IConfiguration Configuration { get; }
 
         // This method gets called by the runtime. Use this method to add services to the container.
         public void ConfigureServices(IServiceCollection services)
         {
             services.AddDbContext<BertiniEventosContext>(context => context.UseSqlite(Configuration.GetConnectionString("DefaultConnection")));
             services.AddControllers()
             .AddNewtonsoftJson(x => x.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
             services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
             services.AddScoped<IEventosService, EventoService>();
             services.AddScoped<ILoteService, LoteService>();
             services.AddScoped<IGeralPersist, GeralPersist>();
             services.AddScoped<IEventoPersist, EventosPersist>();
             services.AddScoped<ILotePersist, LotePersist>();
             services.AddCors();
             services.AddSwaggerGen(c =>
             {
                 c.SwaggerDoc("v1", new OpenApiInfo { Title = "BertiniEventos.API", Version = "v1" });
             });
         }
 
         // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
         public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
         {
             if (env.IsDevelopment())
             {
                 app.UseDeveloperExceptionPage();
                 app.UseSwagger();
                 app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "BertiniEventos.API v1"));
             }
 
             app.UseHttpsRedirection();
 
             app.UseRouting();
 
             app.UseAuthorization();

             app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
 
             app.UseEndpoints(endpoints =>
             {
                 endpoints.MapControllers();
             });
         }
     }

   
}