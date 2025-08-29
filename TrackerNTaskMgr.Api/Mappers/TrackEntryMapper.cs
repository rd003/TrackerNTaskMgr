using TrackerNTaskMgr.Api.DTOs;
using TrackerNTaskMgr.Api.Entities;

namespace TrackerNTaskMgr.Api.Mappers;

public static class TrackEntryMapper
{
    public static TrackEntry ToTrackEntry(this TrackEntryCreateDto trackEntry)
    {
        return new TrackEntry
        {
            EntryDate = trackEntry.EntryDate ?? DateTimeOffset.UtcNow.Date,
            SleptAt = trackEntry.SleptAt ?? DateTimeOffset.MinValue,
            WokeUpAt = trackEntry.WokeUpAt ?? DateTimeOffset.MinValue,
            NapInMinutes = trackEntry.NapInMinutes,
            TotalWorkInMinutes = trackEntry.TotalWorkInMinutes ?? 0,
            Remarks = trackEntry.Remarks,
            CreatedAt = DateTimeOffset.UtcNow,
            UpdatedAt = null
        };
    }

    public static TrackEntry ToTrackEntry(this TrackEntryUpdateDto trackEntry)
    {
        return new TrackEntry
        {
            Id = trackEntry.TrackEntryId ?? "",
            EntryDate = trackEntry.EntryDate ?? DateTime.UtcNow.Date,
            SleptAt = trackEntry.SleptAt ?? DateTime.MinValue,
            WokeUpAt = trackEntry.WokeUpAt ?? DateTime.MinValue,
            NapInMinutes = trackEntry.NapInMinutes,
            TotalWorkInMinutes = trackEntry.TotalWorkInMinutes ?? 0,
            Remarks = trackEntry.Remarks,
            UpdatedAt = DateTime.UtcNow
        };
    }

    public static TrackEntryReadDto ToTrackEntryReadDto(this TrackEntry trackEntry)
    {
        return new TrackEntryReadDto
        {
            TrackEntryId = trackEntry.Id,
            EntryDate = trackEntry.EntryDate,
            SleptAt = trackEntry.SleptAt,
            WokeUpAt = trackEntry.WokeUpAt,
            NapInMinutes = trackEntry.NapInMinutes,
            TotalWorkInMinutes = trackEntry.TotalWorkInMinutes,
            Remarks = trackEntry.Remarks
        };
    }

    public static TrackEntryReadDto ToTrackEntryReadDto(this TrackEntryCreateDto trackEntry)
    {
        return new TrackEntryReadDto
        {
            EntryDate = trackEntry.EntryDate ?? DateTime.Now,
            SleptAt = trackEntry.SleptAt ?? DateTime.MinValue,
            WokeUpAt = trackEntry.WokeUpAt ?? DateTime.MinValue,
            NapInMinutes = trackEntry.NapInMinutes,
            TotalWorkInMinutes = trackEntry.TotalWorkInMinutes ?? 0,
            Remarks = trackEntry.Remarks
        };
    }

}
