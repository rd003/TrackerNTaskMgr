using TrackerNTaskMgr.Api.DTOs;

namespace TrackerNTaskMgr.Api.Mappings;

public static class TrackEntryMapper
{
    public static TrackEntryReadDto ToTrackEntryReadDto(this TrackEntryCreateDto dto)
    {
        return new TrackEntryReadDto
        (
            0,
            dto.EntryDate,
            dto.SleptAt,
            dto.WokeUpAt,
            dto.NapInMinutes,
            0,
            dto.TotalWorkInMinutes,
            null
         );
    }
}