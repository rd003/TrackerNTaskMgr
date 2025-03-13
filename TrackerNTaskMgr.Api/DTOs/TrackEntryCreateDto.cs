using TrackerNTaskMgr.Api.Entities;

namespace TrackerNTaskMgr.Api.DTOs;
public record TrackEntryCreateDto
(
    DateTime EntryDate,
    DateTime SleptAt,
    DateTime WokeUpAt,
    short? NapInMinutes,
    short TotalWorkInMinutes
);