using TrackerNTaskMgr.Api.DTOs;

namespace TrackerNTaskMgr.Api.Services;

public interface ITrackEntryService
{
    System.Threading.Tasks.Task<TrackEntryReadDto> CreateTrackEntryAsync(TrackEntryCreateDto trackEntryToCreate);
    System.Threading.Tasks.Task DeleteTrackEntryAsync(int trackEntryId);
    System.Threading.Tasks.Task<IEnumerable<TrackEntryReadDto>> GetTrackEntiesAsync(GetTrackEntriesParams parameters);
    System.Threading.Tasks.Task<TrackEntryReadDto?> GetTrackEntryAsync(int id);
    System.Threading.Tasks.Task UpdateTrackEntryAsync(TrackEntryUpdateDto trackEntryToUpdate);
}
