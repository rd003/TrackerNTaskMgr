namespace TrackerNTaskMgr.Api.DTOs;

public class TrackEntryReadDto
{
    public string TrackEntryId { get; set; } = null!;
    public DateTime EntryDate { get; set; }
    public DateTime SleptAt { get; set; }
    public DateTime WokeUpAt { get; set; }
    public int? NapInMinutes { get; set; }
    public int? TotalSleepInMinutes
    {
        get => CalculateTotalSleepInMinutes(SleptAt, WokeUpAt, NapInMinutes);
    }
    public int TotalWorkInMinutes { get; set; }
    public string? Remarks { get; set; }

    private static int? CalculateTotalSleepInMinutes(DateTime sleptAt, DateTime wokeUpAt, int? napInMinutes)
    {
        // Calculate main sleep duration
        var sleepDuration = wokeUpAt - sleptAt;
        var mainSleepMinutes = (int)sleepDuration.TotalMinutes;

        // Add nap minutes if available
        var totalSleep = mainSleepMinutes + (napInMinutes ?? 0);

        return totalSleep > 0 ? totalSleep : null;
    }
}
