namespace TrackerNTaskMgr.Api.DTOs;

public class DisplayBoardTaskDto
{
    public string TaskId { get; set; } = null!;
    public string TaskTitle { get; set; } = string.Empty;
    public DateTimeOffset? ScheduledAt { get; set; }
    public DateTimeOffset? Deadline { get; set; }
    public string TaskStatusName { get; set; } = string.Empty;
    public string TaskPriorityName { get; set; } = string.Empty;
}