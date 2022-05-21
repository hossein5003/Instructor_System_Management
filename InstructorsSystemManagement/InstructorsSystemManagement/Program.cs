using InstructorsSystemManagement.DataAccess;
using InstructorsSystemManagement.DataAccess.Repository;
using InstructorsSystemManagement.DataAccess.Repository.IRepository;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors();
// Add services to the container.
string mySqlConnectionStr = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySql(mySqlConnectionStr, ServerVersion.AutoDetect(mySqlConnectionStr)));

builder.Services.AddScoped<ICourseRepository, CourseRepository>();
builder.Services.AddScoped<IInstructorRepository, InstructorRepository>();
builder.Services.AddScoped<IDepartmentRepository, DepartmentRepository>();

builder.Services.AddControllers().AddNewtonsoftJson(options =>
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var app = builder.Build();

app.UseCors(options =>
options.WithOrigins("http://localhost:3000")
.AllowAnyHeader()
.AllowAnyMethod());

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
