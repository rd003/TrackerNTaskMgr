namespace TrackerNTaskMgr.Api.DTOs;

public record GetTrackEntriesParams
(
    DateTimeOffset? StartDate,
    DateTimeOffset? EndDate,
    string SortDirection = "DESC",
    DateTimeOffset? LastEntryDate = null,
    string PageDirection = "NEXT",
    int Limit = 10
);
