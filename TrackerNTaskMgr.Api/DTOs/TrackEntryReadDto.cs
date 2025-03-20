namespace TrackerNTaskMgr.Api.DTOs;

//public record TrackEntryReadDto
//(
//    int TrackEntryId,
//    DateTime EntryDate,
//    DateTime SleptAt,
//    DateTime WokeUpAt,
//    short? NapInMinutes,
//    int? TotalSleepInMinutes,
//    short TotalWorkInMinutes,
//    TrackEntryRemarkReadDto? TrackEntryRemark
//);

public class TrackEntryReadDto
{
    public int TrackEntryId { get; set; }
    public DateTime EntryDate { get; set; }
    public DateTime SleptAt { get; set; }
    public DateTime WokeUpAt { get; set; }
    public short? NapInMinutes { get; set; }
    public int? TotalSleepInMinutes { get; set; }
    public short TotalWorkInMinutes { get; set; }
    public TrackEntryRemarkReadDto? TrackEntryRemark { get; set; }

    public TrackEntryReadDto() { }

    // Full constructor
    public TrackEntryReadDto(
        int trackEntryId,
        DateTime entryDate,
        DateTime sleptAt,
        DateTime wokeUpAt,
        short? napInMinutes,
        int? totalSleepInMinutes,
        short totalWorkInMinutes,
        TrackEntryRemarkReadDto? trackEntryRemark)
    {
        TrackEntryId = trackEntryId;
        EntryDate = entryDate;
        SleptAt = sleptAt;
        WokeUpAt = wokeUpAt;
        NapInMinutes = napInMinutes;
        TotalSleepInMinutes = totalSleepInMinutes;
        TotalWorkInMinutes = totalWorkInMinutes;
        TrackEntryRemark = trackEntryRemark;
    }
}
