namespace TrackerNTaskMgr.Api.DTOs;
public record TaskHeaderReadDto
(
    int TaskHeaderId,
    string TaskHeaderTitle,
    int SortOrder,
    ICollection<TaskReadDTO> Tasks
);