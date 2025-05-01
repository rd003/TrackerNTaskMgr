namespace TrackerNTaskMgr.Api.DTOs;

public record GetTrackEntriesParams
(
    DateOnly? StartDate,
    DateOnly? EndDate,
    string SortDirection = "DESC",
    DateOnly? LastEntryDate = null,
    string PageDirection = "NEXT",
    int Limit = 10
);
