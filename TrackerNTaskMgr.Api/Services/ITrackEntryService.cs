using TrackerNTaskMgr.Api.DTOs;

namespace TrackerNTaskMgr.Api.Services;

public interface ITrackEntryService
{
    Task<TrackEntryReadDto> CreateTrackEntryAsync(TrackEntryCreateDto trackEntryToCreate);
    Task DeleteTrackEntryAsync(string trackEntryId);
    Task<IEnumerable<TrackEntryReadDto>> GetTrackEntiesAsync(GetTrackEntriesParams parameters);
    Task<TrackEntryReadDto?> GetTrackEntryAsync(string id);
    Task UpdateTrackEntryAsync(TrackEntryUpdateDto trackEntryToUpdate);
}
