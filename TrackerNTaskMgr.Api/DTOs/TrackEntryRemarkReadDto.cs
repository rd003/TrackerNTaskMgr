namespace TrackerNTaskMgr.Api.DTOs;

//public record TrackEntryRemarkReadDto
//(
//    int TrackEntryId,
//    string Remarks,
//    TrackEntryReadDto TrackEntryReadDto
// );

public class TrackEntryRemarkReadDto
{
    public int TrackEntryId { get; set; }
    public string Remarks { get; set; } = string.Empty;
    public TrackEntryReadDto? TrackEntry { get; set; }

    public TrackEntryRemarkReadDto() { }

    public TrackEntryRemarkReadDto(int trackEntryId, string remarks)
    {
        TrackEntryId = trackEntryId;
        Remarks = remarks;
    }
}