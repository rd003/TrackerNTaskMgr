using CsvHelper;
using CsvHelper.Configuration;
using Dapper;
using Microsoft.AspNetCore.Http.Features;
using Scalar.AspNetCore;
using System.Data;
using System.Globalization;
using TrackerNTaskMgr.Api.DTOs;
using TrackerNTaskMgr.Api.Exceptions;
using TrackerNTaskMgr.Api.Services;
using TrackerNTaskMgr.Api.TypeHandlers;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddOpenApi();

builder.Services.AddTransient<ITrackEntryService, TrackEntryService>();

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

Dapper.SqlMapper.AddTypeHandler(new DateOnlyTypeHandler());

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseExceptionHandler();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapPost("/bulk-track-entries", async (ITrackEntryService trackEntryService) => {
    await InsertTrackEntries(trackEntryService);
    return Results.Ok();
});

await app.RunAsync();


static async Task InsertTrackEntries(ITrackEntryService trackEntryService)
{
    string filePath = "C:\\Users\\RD\\Desktop\\track-entries.csv";
    var csvConfig = new CsvConfiguration(CultureInfo.InvariantCulture);
    using StreamReader streamReader = new (filePath);
    using CsvReader csvReader = new (streamReader, csvConfig);
    var trackEntries = csvReader.GetRecords<TrackEntryCreateDto>().ToList();

    // 📝 writing records to database
    // I know their is a better approaches for bulk insert. But I do not want to waste time here. I will rarely use this feature. Even I use this, there won't be more than 10 records.
    // Since I have built in procedure for single track entry, I am goint to use it.
    foreach(TrackEntryCreateDto trackEntry in trackEntries)
    {
        await trackEntryService.CreateTrackEntryAsync(trackEntry);
    }
    
}

