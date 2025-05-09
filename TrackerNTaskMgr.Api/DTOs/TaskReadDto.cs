namespace TrackerNTaskMgr.Api.DTOs;

public class TaskReadDTO
{
    public int TaskId { get; set; }
    public int TaskHeaderId { get; set; }
    public string TaskTitle { get; set; } = string.Empty;
    public string? TaskUri { get; set; }
    public byte TaskPriorityId { get; set; }
    public byte TaskStatusId { get; set; }
    public DateTime? Deadline { get; set; }
    public DateTime? ScheduledAt { get; set; }
    public string TaskHeaderTitle { get; set; } = string.Empty;
    public List<SubTaskReadDto> SubTasks { get; set; } = [];
    public TaskStatusReadDto TaskStatus { get; set; } = null!;
    public TaskPriorityReadDto TaskPriority { get; set; } = null!;
    public List<string> Tags { get; set; } = [];
}

