using TrackerNTaskMgr.Api.DTOs;

namespace TrackerNTaskMgr.Api.Services;

public interface ITrackEntryService
{
    Task<TrackEntryReadDto?> CreateTrackEntryAsync(TrackEntryCreateDto trackEntryToCreate);
    Task DeleteTrackEntryAsync(int trackEntryId);
    Task<IEnumerable<TrackEntryReadDto>> GetTrackEntiesAsync();
    Task<TrackEntryReadDto?> GetTrackEntryAsync(int id);
    Task UpdateTrackEntryAsync(TrackEntryUpdateDto trackEntryToUpdate);
}
