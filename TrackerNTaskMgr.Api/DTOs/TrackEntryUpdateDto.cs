namespace TrackerNTaskMgr.Api.DTOs;

public record TrackEntryUpdateDto
(
int TrackEntryId,
DateTime EntryDate,
DateTime SleptAt,
DateTime WokeUpAt,
short? NapInMinutes,
short TotalWorkInMinutes,
string? Remarks
);
