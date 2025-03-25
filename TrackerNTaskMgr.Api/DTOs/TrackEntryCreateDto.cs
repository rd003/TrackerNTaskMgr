namespace TrackerNTaskMgr.Api.DTOs;
public record TrackEntryCreateDto
(
    DateOnly? EntryDate,
    DateTime? SleptAt,
    DateTime? WokeUpAt,
    short? NapInMinutes,
    short? TotalWorkInMinutes,
    string? Remarks
);
