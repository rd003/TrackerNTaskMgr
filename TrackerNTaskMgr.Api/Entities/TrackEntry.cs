namespace TrackerNTaskMgr.Api.Entities;

public class TrackEntry
{
    public int TrackEntryId { get; set; }
    public DateTime EntryDate { get; set; }
    public DateTime SleptAt { get; set; }
    public DateTime WokeUpAt { get; set; }
    public short? NapInMinutes { get; set; }
    public int? TotalSleepInMinutes { get; set; }
    public short TotalWorkInMinutes { get; set; }
    public DateTime Created { get; set; }
    public DateTime? Updated { get; set; }
    public  TrackEntryRemark? TrackEntryRemark { get; set; }
}