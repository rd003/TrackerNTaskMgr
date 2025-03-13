namespace TrackerNTaskMgr.Api.DTOs;

public record TrackEntryRemarkReadDto
(
    int TrackEntryId,
    string Remarks,
    TrackEntryReadDto TrackEntryReadDto
 );
