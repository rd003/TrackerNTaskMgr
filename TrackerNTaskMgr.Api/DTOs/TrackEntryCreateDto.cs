namespace TrackerNTaskMgr.Api.DTOs;

public record TrackEntryCreateDto
(
    DateTime? EntryDate,
    DateTime? SleptAt,
    DateTime? WokeUpAt,
    int? NapInMinutes,
    int? TotalWorkInMinutes,
    string? Remarks
);
