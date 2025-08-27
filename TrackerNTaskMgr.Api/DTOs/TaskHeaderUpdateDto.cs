namespace TrackerNTaskMgr.Api.DTOs;

public record TaskHeaderUpdateDto
(
    string? TaskHeaderId,
    string? TaskHeaderTitle,
    int? SortOrder
);