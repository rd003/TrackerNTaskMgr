using Microsoft.AspNetCore.Mvc;
using TrackerNTaskMgr.Api.DTOs;
using TrackerNTaskMgr.Api.Exceptions;
using TrackerNTaskMgr.Api.Services;

namespace TrackerNTaskMgr.Api.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class TrackEntriesController : ControllerBase
{
    private readonly ITrackEntryService _trackEntryServcice;

    public TrackEntriesController(ITrackEntryService trackEntryServcice)
    {
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

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTrackEntry(int id, [FromBody]TrackEntryUpdateDto trackEntryToUpdate)
    {
        if(id!=trackEntryToUpdate.TrackEntryId)
        {
            throw new BadRequestException("Ids mismatch");
        }

        TrackEntryReadDto? trackEntry = await _trackEntryServcice.GetTrackEntryAsync(id);
        
        if (trackEntry == null)
        {
            throw new NotFoundException("Track entry not found");
        }

        await _trackEntryServcice.UpdateTrackEntryAsync(trackEntryToUpdate);
        return NoContent();
    }

    public async Task<IActionResult> GetTrackEntries([FromQuery]GetTrackEntriesParams parameters)
    {
        
        return Ok();
    }
}