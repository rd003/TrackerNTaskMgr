using Microsoft.AspNetCore.Mvc;
using TrackerNTaskMgr.Api.DTOs;
using TrackerNTaskMgr.Api.Services;

namespace TrackerNTaskMgr.Controllers;

[ApiController]
[Route("/api/{controller}/{id}")]
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
    public async Task<IActionResult> CreateTrackEntry(TrackEntryCreateDto trackEntryCreate)
    {
        return Ok();
    }

}