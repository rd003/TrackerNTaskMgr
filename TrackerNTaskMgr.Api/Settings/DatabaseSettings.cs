namespace TrackerNTaskMgr.Api.Settings;

public class DatabaseSettings
{
    public string ConnectionString { get; set; } = null!;
    public string DatabaseName { get; set; } = null!;
    public string UserCollectionName { get; set; } = null!;
    public string TrackEntryCollectionName { get; set; } = null!;
    public string TaskItemCollectionName { get; set; } = null!;
}
