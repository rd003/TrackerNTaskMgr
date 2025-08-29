namespace TrackerNTaskMgr.Api.DTOs;

public record TrackEntryCreateDto
(
    DateTimeOffset? EntryDate,
    DateTimeOffset? SleptAt,
    DateTimeOffset? WokeUpAt,
    int? NapInMinutes,
    int? TotalWorkInMinutes,
    string? Remarks
);
