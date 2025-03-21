using TrackerNTaskMgr.Api.DTOs;

namespace TrackerNTaskMgr.Api.Services;

public interface ITrackEntryService
{
    Task<TrackEntryReadDto?> CreateTrackEntryAsync(TrackEntryCreateDto trackEntryToCreate);
    Task DeleteTrackEntryAsync(int trackEntryId);
    Task<IEnumerable<TrackEntryReadDto>> GetTrackEntiesAsync(GetTrackEntriesParams parameters);
    Task<TrackEntryReadDto?> GetTrackEntryAsync(int id);
    Task UpdateTrackEntryAsync(TrackEntryUpdateDto trackEntryToUpdate);
}
