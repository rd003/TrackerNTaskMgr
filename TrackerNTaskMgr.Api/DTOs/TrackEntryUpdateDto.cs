namespace TrackerNTaskMgr.Api.DTOs;

public record TrackEntryUpdateDto
(
string? TrackEntryId,
DateTime? EntryDate,
DateTime? SleptAt,
DateTime? WokeUpAt,
int? NapInMinutes,
int? TotalWorkInMinutes,
string? Remarks
);
