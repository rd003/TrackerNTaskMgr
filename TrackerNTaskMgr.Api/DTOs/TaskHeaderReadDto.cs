namespace TrackerNTaskMgr.Api.DTOs;
public record TaskHeaderReadDto
(
    int TaskHeaderId,
    string TaskHeaderTitle,
    ICollection<TaskReadDTO> Tasks
);