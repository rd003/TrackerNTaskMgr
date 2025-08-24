namespace TrackerNTaskMgr.Api.DTOs;

public record GetTrackEntriesParams
(
    DateTime? StartDate,
    DateTime? EndDate,
    string SortDirection = "DESC",
    DateTime? LastEntryDate = null,
    string PageDirection = "NEXT",
    int Limit = 10
);
