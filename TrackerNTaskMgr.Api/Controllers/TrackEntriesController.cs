using Microsoft.AspNetCore.Mvc;
using TrackerNTaskMgr.Api.DTOs;
using TrackerNTaskMgr.Api.Exceptions;
using TrackerNTaskMgr.Api.Services;

namespace TrackerNTaskMgr.Api.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class TrackEntriesController : ControllerBase
{
    private readonly ILogger<TrackEntriesController> _logger;
    private readonly ITrackEntryService _trackEntryServcice;

    public TrackEntriesController(ILogger<TrackEntriesController> logger, ITrackEntryService trackEntryServcice)
    {
        _logger = logger;
        _trackEntryServcice = trackEntryServcice;
    }

    [HttpPost]
    public async Task<IActionResult> CreateTrackEntry(TrackEntryCreateDto trackEntryToCreate)
    {
        TrackEntryReadDto? createdTrackEntry = await _trackEntryServcice.CreateTrackEntryAsync(trackEntryToCreate);
        return CreatedAtRoute("GetTrackEntry", new { id = createdTrackEntry.TrackEntryId }, createdTrackEntry);
    }

    [HttpGet("{id}", Name = "GetTrackEntry")]
    public async Task<IActionResult> GetTrackEntry(int id)
    {
        TrackEntryReadDto? trackEntry = await _trackEntryServcice.GetTrackEntryAsync(id);
        if (trackEntry == null)
        {
            throw new NotFoundException("Track entry not found");
        }
        return Ok(trackEntry);
    }

}