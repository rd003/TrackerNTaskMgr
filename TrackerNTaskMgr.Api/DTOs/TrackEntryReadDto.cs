namespace TrackerNTaskMgr.Api.DTOs;

public class TrackEntryReadDto
{
    public string TrackEntryId { get; set; } = null!;
    public DateTime EntryDate { get; set; }
    public DateTime SleptAt { get; set; }
    public DateTime WokeUpAt { get; set; }
    public int? NapInMinutes { get; set; }
    public int? TotalSleepInMinutes { get; set; }
    public int TotalWorkInMinutes { get; set; }
    public string? Remarks { get; set; }
}
