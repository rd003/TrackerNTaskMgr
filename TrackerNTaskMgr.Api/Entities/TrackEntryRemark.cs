namespace TrackerNTaskMgr.Api.Entities;

public class TrackEntryRemark
{
    public int TrackEntryId { get; set; }
    public string Remarks { get; set; } = string.Empty;
    public TrackEntry? TrackEntry { get; set; }
}