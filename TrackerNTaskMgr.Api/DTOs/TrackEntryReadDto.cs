using TrackerNTaskMgr.Api.Entities;

namespace TrackerNTaskMgr.Api.DTOs;
public record TrackEntryReadDto
(
int TrackEntryId,
DateTime EntryDate,
DateTime SleptAt,
DateTime WokeUpAt,
short? NapInMinutes,
int? TotalSleep,
short TotalWorkInMinutes,
DateTime Created,
DateTime? Updated,
DateTime? Deleted,
TrackEntryRemarkReadDto? TrackEntryRemark
);

