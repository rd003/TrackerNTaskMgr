using CsvHelper;
using CsvHelper.Configuration;

using Dapper;

using FluentValidation;

using Microsoft.AspNetCore.Http.Features;

using Scalar.AspNetCore;

using System.Globalization;

using TrackerNTaskMgr.Api.DTOs;
using TrackerNTaskMgr.Api.Exceptions;
using TrackerNTaskMgr.Api.Extensions;
using TrackerNTaskMgr.Api.Services;
using TrackerNTaskMgr.Api.TypeHandlers;
using TrackerNTaskMgr.Api.Validators;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddOpenApi();

// registering services
builder.Services.AddTransient<ITrackEntryService, TrackEntryService>();
builder.Services.AddTransient<ITaskService, TaskService>();

// Global exception handling
builder.Services.AddExceptionHandler<CustomExceptionHandler>();
builder.Services.AddProblemDetails(options =>
{
    options.CustomizeProblemDetails = context =>
    {
        context.ProblemDetails.Instance = $"{context.HttpContext.Request.Method} {context.HttpContext.Request.Path}";
        context.ProblemDetails.Extensions.TryAdd("requestId", context.HttpContext.TraceIdentifier);

        var activity = context.HttpContext.Features.Get<IHttpActivityFeature>()?.Activity;
        context.ProblemDetails.Extensions.TryAdd("traceId", activity.Id);
    };
});

// registering DateOnly type, because dapper does not support DateOnly type out of the box
SqlMapper.AddTypeHandler(new DateOnlyTypeHandler());

// registering validators
//builder.Services.AddScoped<IValidator<TrackEntryCreateDto>, TrackEntryCreateDtoValidator>();

//builder.Services.AddScoped<IValidator<TrackEntryUpdateDto>, TrackEntryUpdateValidator>();

builder.Services.AddValidatorsFromAssemblyContaining<TrackEntryCreateDtoValidator>();

// cors


builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:4200")
                                .AllowAnyHeader()
                .AllowAnyMethod();
                      });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseExceptionHandler();

app.UseHttpsRedirection();

app.UseCors(MyAllowSpecificOrigins);

app.UseAuthorization();

app.MapControllers();

app.MapPost("/bulk-track-entries", async (ITrackEntryService trackEntryService) =>
{
    await InsertTrackEntries(trackEntryService);
    return Results.Ok();
});

await app.SeedAsync(); // Seeding default user

await app.RunAsync();

static async Task InsertTrackEntries(ITrackEntryService trackEntryService)
{
    string filePath = "C:\\Users\\RD\\Desktop\\track-entries.csv";
    var csvConfig = new CsvConfiguration(CultureInfo.InvariantCulture);
    using StreamReader streamReader = new(filePath);
    using CsvReader csvReader = new(streamReader, csvConfig);
    var trackEntries = csvReader.GetRecords<TrackEntryCreateDto>().ToList();

    // 📝 writing records to database
    // I know their is a better approaches for bulk insert. But I do not want to waste time here. I will rarely use this feature. Even I use this, there won't be more than 10 records.
    // Since I have built in procedure for single track entry, I am going to use it.
    foreach (TrackEntryCreateDto trackEntry in trackEntries)
    {
        await trackEntryService.CreateTrackEntryAsync(trackEntry);
    }
}
