using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using TrackerNTaskMgr.Api.DTOs;
using TrackerNTaskMgr.Api.Exceptions;
using TrackerNTaskMgr.Api.Extensions;
using TrackerNTaskMgr.Api.Services;

namespace TrackerNTaskMgr.Api.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class TrackEntriesController : ControllerBase
{
    private readonly ITrackEntryService _trackEntryServcice;
    private readonly IValidator<TrackEntryCreateDto> _trackEntryCreateValidator;
    private readonly IValidator<TrackEntryUpdateDto> _trackEntryUpdateValidator;

    public TrackEntriesController(ITrackEntryService trackEntryServcice, IValidator<TrackEntryCreateDto> trackEntryCreateValidator, IValidator<TrackEntryUpdateDto> trackEntryUpdateValidator)
    {
        _trackEntryServcice = trackEntryServcice;
        _trackEntryCreateValidator = trackEntryCreateValidator;
        _trackEntryUpdateValidator = trackEntryUpdateValidator;
    }

    [HttpPost]
    public async Task<IActionResult> CreateTrackEntry(TrackEntryCreateDto trackEntryToCreate)
    {
        var validationResult = await _trackEntryCreateValidator.ValidateAsync(trackEntryToCreate);
        if(!validationResult.IsValid)
        {
            validationResult.AddToModelState(ModelState);
            return UnprocessableEntity(ModelState);
        }
        TrackEntryReadDto? createdTrackEntry = await _trackEntryServcice.CreateTrackEntryAsync(trackEntryToCreate);
        return CreatedAtRoute("GetTrackEntry", new { id = createdTrackEntry.TrackEntryId }, createdTrackEntry);
    }

    [HttpGet("{id:int}", Name = "GetTrackEntry")]
    public async Task<IActionResult> GetTrackEntry(int id)
    {
        TrackEntryReadDto? trackEntry = await _trackEntryServcice.GetTrackEntryAsync(id);
        
        if (trackEntry == null)
        {
            throw new NotFoundException("Track entry not found");
        }
        return Ok(trackEntry);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateTrackEntry(int id, [FromBody]TrackEntryUpdateDto trackEntryToUpdate)
    {
        var validationResult = await _trackEntryUpdateValidator.ValidateAsync(trackEntryToUpdate);
        if(!validationResult.IsValid)
        {
           validationResult.AddToModelState(ModelState);
           return UnprocessableEntity(ModelState);
        }

        if (id != trackEntryToUpdate.TrackEntryId)
        {
            throw new BadRequestException("Ids mismatch");
        }

        TrackEntryReadDto? trackEntry = await _trackEntryServcice.GetTrackEntryAsync(id);

        if (trackEntry == null)
        {
            throw new NotFoundException("Track entry not found");
        }

        await _trackEntryServcice.UpdateTrackEntryAsync(trackEntryToUpdate);

        // Bad engineering: It is bad practice. It should be done in UpdateTrackEntry stored proc. It would save an additional roundtrip

        TrackEntryReadDto? trackEntryUpdate = await _trackEntryServcice.GetTrackEntryAsync(id);
        return Ok(trackEntryUpdate);
    }

    [HttpGet]
    public async Task<IActionResult> GetTrackEntries([FromQuery]GetTrackEntriesParams parameters)
    {
        var trackEntries = await _trackEntryServcice.GetTrackEntiesAsync(parameters);
        return Ok(trackEntries);
    }

    [HttpDelete("{trackEntryId:int}")]
    public async Task<IActionResult> DeleteTrackEntry(int trackEntryId)
    {
        TrackEntryReadDto? trackEntry = await _trackEntryServcice.GetTrackEntryAsync(trackEntryId);

        if (trackEntry == null)
        {
            throw new NotFoundException("Track entry not found");
        }

        await _trackEntryServcice.DeleteTrackEntryAsync(trackEntryId);
        return NoContent();
    }

}