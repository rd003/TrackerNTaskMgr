namespace TrackerNTaskMgr.Api.DTOs;

public class TaskReadDTO
{
    public string TaskId { get; set; } = null!;
    public string TaskHeaderId { get; set; } = null!;
    public string TaskTitle { get; set; } = string.Empty;
    public string? TaskUri { get; set; }
    public byte TaskPriorityId { get; set; }
    public byte TaskStatusId { get; set; }
    public DateTimeOffset? Deadline { get; set; }
    public DateTimeOffset? ScheduledAt { get; set; }
    public bool DisplayAtBoard { get; set; }
    public string TaskHeaderTitle { get; set; } = string.Empty;
    public List<SubTaskReadDto> SubTasks { get; set; } = [];
    public string TaskStatus { get => ((TrackerNTaskMgr.Api.Constants.TaskStatus)TaskStatusId).ToString(); }
    public string TaskPriority
    {
        get =>
         ((TrackerNTaskMgr.Api.Constants.TaskPriority)TaskPriorityId).ToString();
    }
    public List<string> Tags { get; set; } = [];
}

