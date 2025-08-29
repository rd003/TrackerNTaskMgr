namespace TrackerNTaskMgr.Api.DTOs;

public record TrackEntryUpdateDto
(
string? TrackEntryId,
DateTimeOffset? EntryDate,
DateTimeOffset? SleptAt,
DateTimeOffset? WokeUpAt,
int? NapInMinutes,
int? TotalWorkInMinutes,
string? Remarks
);
