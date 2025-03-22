namespace TrackerNTaskMgr.Api.DTOs;
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
}
