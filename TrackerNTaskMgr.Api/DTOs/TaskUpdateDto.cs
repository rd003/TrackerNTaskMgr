namespace TrackerNTaskMgr.Api.DTOs;

public class TaskUpdateDto
{
    public string? TaskId { get; set; }
    public string? TaskHeaderId { get; set; }
    public string? TaskTitle { get; set; } = string.Empty;
    public string? TaskUri { get; set; }
    public byte? TaskPriorityId { get; set; }
    public byte? TaskStatusId { get; set; }
    public DateTimeOffset? Deadline { get; set; }
    public DateTimeOffset? ScheduledAt { get; set; }

    public bool DisplayAtBoard { get; set; }
    public List<SubTaskUpdateDto> SubTasks { get; set; } = [];
    public string? Tags { get; set; }
}
