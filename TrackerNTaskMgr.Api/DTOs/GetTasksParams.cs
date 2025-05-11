namespace TrackerNTaskMgr.Api.DTOs;

public record GetTasksParams
(
    int? TaskHeaderId,
    int? TaskPriorityId,
    int? TagId,
    string? SortBy,
    string? SortDirection
);
