namespace back.src;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        Stats stats = new Stats();

        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        var app = builder.Build();

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
