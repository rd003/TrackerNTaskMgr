namespace TrackerNTaskMgr.Api.DTOs;

public record GetTasksParams
(
    string? TaskHeaderId,
    int? TaskPriorityId,
    string? Tag,
    string? SortBy,
    string? SortDirection
);
