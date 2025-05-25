using FluentValidation;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using TrackerNTaskMgr.Api.DTOs;
using TrackerNTaskMgr.Api.Exceptions;
using TrackerNTaskMgr.Api.Extensions;
using TrackerNTaskMgr.Api.Services;

namespace TrackerNTaskMgr.Api.Controllers;

[ApiController]
[Route("/api/[controller]")]
[Authorize]
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
        if (!validationResult.IsValid)
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
    public async Task<IActionResult> UpdateTrackEntry(int id, [FromBody] TrackEntryUpdateDto trackEntryToUpdate)
    {
        var validationResult = await _trackEntryUpdateValidator.ValidateAsync(trackEntryToUpdate);
        if (!validationResult.IsValid)
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
    public async Task<IActionResult> GetTrackEntries([FromQuery] GetTrackEntriesParams parameters)
    {
        ValidateGetTrackEntryParams(parameters);
        // Console.WriteLine($"====> logged at: {DateTime.Now.ToString("dd-mm-yyy hh:mm:ss")}");
        // Console.WriteLine(parameters);
        var trackEntries = await _trackEntryServcice.GetTrackEntiesAsync(parameters);
        // Note: Bad practice
        // Problem: When handling 'prev' + 'desc', the data is coming in asc order, I am reordering them here. Same goes for prev+asc, we need to manually convert data to asc order.
        // TODO: Refactor this
        if (parameters.LastEntryDate != null && parameters.SortDirection.ToUpper() == "DESC" && parameters.PageDirection.ToUpper() == "PREV")
        {
            trackEntries = [.. trackEntries.OrderByDescending(a => a.EntryDate)];
        }
        if (parameters.LastEntryDate != null && parameters.SortDirection.ToUpper() == "ASC" && parameters.PageDirection.ToUpper() == "PREV")
        {
            trackEntries = [.. trackEntries.OrderBy(a => a.EntryDate)];
        }
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

    private void ValidateGetTrackEntryParams(GetTrackEntriesParams parameters)
    {
        if (!new string[] { "ASC", "DESC" }.Contains(parameters.SortDirection.ToUpper()))
        {
            throw new BadRequestException("SortDirection only accepts 'ASC' or 'DESC'");
        }

        if (!new string[] { "NEXT", "PREV" }.Contains(parameters.PageDirection.ToUpper()))
        {
            throw new BadRequestException("PageDirection only accepts 'NEXT' or 'PREV'");
        }
    }

}
