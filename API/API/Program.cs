using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDataContext>();

builder.Services.AddCors(options =>
    options.AddPolicy("Acesso Total",
        configs => configs
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod())
);

builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
});

var app = builder.Build();

app.MapGet("/", () => "lucas_seco");

//ENDPOINTS DE TAREFA
//GET: http://localhost:5273/api/chamado/listar
app.MapGet("/api/chamado/listar", ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Chamados.Any())
    {
        return Results.Ok(ctx.Chamados.ToList());
    }
    return Results.NotFound("Nenhum chamado encontrada");
});

//POST: http://localhost:5273/api/chamado/cadastrar
app.MapPost("/api/chamado/cadastrar", ([FromServices] AppDataContext ctx, [FromBody] Chamado chamado) =>
{
    ctx.Chamados.Add(chamado);
    ctx.SaveChanges();
    return Results.Created("", chamado);
});

//PUT: http://localhost:5273/chamado/alterar/{id}
app.MapPut("/api/chamado/alterar/{id}", ([FromServices] AppDataContext ctx, [FromRoute] string id) =>
{
    Chamado? resultado = ctx.Chamados.Find(id);
    if (resultado is null)
    {
        return Results.NotFound("Chamado não encontrado!");
    }
    if (resultado.Status == "Em atendimento")
    {
        resultado.Status = "Resolvido";
    }
    if (resultado.Status == "Aberto")
    {
        resultado.Status = "Em atendimento";
    }

    ctx.Chamados.Update(resultado);
    ctx.SaveChanges();
    return Results.Ok(resultado);
});

//GET: http://localhost:5273/chamado/naoconcluidas
app.MapGet("/api/chamado/naoresolvidos", ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Chamados.Any())
    {
        var chamados = ctx.Chamados.ToList();
        ICollection<Chamado> chamados_abertos = [];
        foreach (Chamado chamado in chamados)
        {
            if(chamado.Status == "Aberto")
            {
                chamados_abertos.Add(chamado);
            }
            if(chamado.Status == "Em atendimento")
            {
                chamados_abertos.Add(chamado);
            }
        }
        return Results.Ok(chamados_abertos);
    }
    return Results.NotFound("Nenhum chamado encontrado");
});

//GET: http://localhost:5273/chamado/concluidas
app.MapGet("/api/chamado/resolvidos", ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Chamados.Any())
    {
        var chamados = ctx.Chamados.ToList();
        ICollection<Chamado> chamados_resolvidos = [];
        foreach (Chamado chamado in chamados)
        {
            if(chamado.Status == "Resolvido")
            {
                chamados_resolvidos.Add(chamado);
            }
        }
        return Results.Ok(chamados_resolvidos);
    }
    return Results.NotFound("Nenhum chamado encontrado");
});


app.UseCors("Acesso Total");
app.Run();
