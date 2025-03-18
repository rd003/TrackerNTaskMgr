namespace TrackerNTaskMgr.Api.DTOs;

public record TrackEntryReadDto
(
    int TrackEntryId,
    DateTime EntryDate,
    DateTime SleptAt,
    DateTime WokeUpAt,
    short? NapInMinutes,
    int? TotalSleepInMinutes,
    short TotalWorkInMinutes,
    TrackEntryRemarkReadDto? TrackEntryRemark
);

