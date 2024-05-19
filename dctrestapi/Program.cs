using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using dctrestapi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<ContentsContext>(opt =>
    opt.UseSqlite("Data Source=dct.db")
);
builder.Services.AddAuthorization(); 
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "DCT Api", Version = "v1" });
});
var allowSpec = "myspec";
builder.Services.AddCors(options => {
    options.AddPolicy(name:allowSpec, policy =>{
        policy.WithOrigins("http://localhost:3000","http://localhost:3002","http://192.168.18.8:3000")
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});


var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "DCT Api");
});

app.UseHttpsRedirection();

// Use CORS

app.UseCors(allowSpec);
app.UseAuthorization();

app.MapControllers();

app.Run();
