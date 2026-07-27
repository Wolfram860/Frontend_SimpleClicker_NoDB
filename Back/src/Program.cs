using Microsoft.Extensions.Options;

namespace back.src;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        Stats stats = new Stats();

        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        //CORS

        builder.Services.AddCors(options =>
        {

            options.AddPolicy("AllowFrontend", policy =>
                policy.WithOrigins("http://localhost:5173")
                    .AllowAnyHeader().AllowAnyMethod());

        });

        //CORS end

        var app = builder.Build();
        app.UseCors("AllowFrontend");

        app.UseSwagger();
        app.UseSwaggerUI();

        //app.MapGet("/", () => "");
        app.MapGet("/Stats", () => stats.GetStats());
        app.MapPost("/Click", () => stats.AddScore());
        app.MapPost("/Upgrades/Autoclick", () => stats.AutoclickUpgrade());
        app.MapPost("/Upgrades/Multiplier", () => stats.MultiplierUpgrade());


        stats.CreateFile();
        app.Run();
    }
}
