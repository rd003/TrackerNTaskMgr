namespace TrackerNTaskMgr.Api.DTOs;

public record GetTrackEntriesParams(DateOnly? StartDate,DateOnly? EndDate):PaginationRequestBase;
