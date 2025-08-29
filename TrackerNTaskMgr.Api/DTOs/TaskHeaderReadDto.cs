namespace TrackerNTaskMgr.Api.DTOs;

public record TaskHeaderReadDto
(
    string TaskHeaderId,
    string TaskHeaderTitle,
    int SortOrder
);