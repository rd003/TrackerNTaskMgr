namespace TrackerNTaskMgr.Api.DTOs;

public class DisplayBoardTaskDto
{     
    public int TaskId { get; set; }
    public string TaskTitle { get; set; } = string.Empty;
    public DateTime? ScheduledAt { get; set; }
    public DateTime? Deadline { get; set; }
    public string TaskStatusName { get; set; } = string.Empty;
    public string TaskStatusEmoji { get; set; } = string.Empty;
    public string TaskPriorityName { get; set; } = string.Empty;
    public string TaskPriorityEmoji { get; set; } = string.Empty;
}