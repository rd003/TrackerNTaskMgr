namespace TrackerNTaskMgr.Api.DTOs;

public record GetTasksParams
(
    string? TaskHeaderId,
    string? TaskPriorityId,
    string? Tag,
    string? SortBy,
    string? SortDirection
);
