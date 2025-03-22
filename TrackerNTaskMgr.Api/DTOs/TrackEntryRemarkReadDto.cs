namespace TrackerNTaskMgr.Api.DTOs;
public class TrackEntryRemarkReadDto
{
    public int TrackEntryId { get; set; }
    public string Remarks { get; set; } = string.Empty;
    public TrackEntryReadDto? TrackEntry { get; set; }
}