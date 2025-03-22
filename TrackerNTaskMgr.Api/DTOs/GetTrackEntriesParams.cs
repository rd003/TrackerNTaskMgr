namespace TrackerNTaskMgr.Api.DTOs;

public record GetTrackEntriesParams
(
    DateOnly? StartDate,
    DateOnly? EndDate,
    string SortDirection="DESC", 
    DateOnly? LastEntryDate=null,
    int Limit=10
);
