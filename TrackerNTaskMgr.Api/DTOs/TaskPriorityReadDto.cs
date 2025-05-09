namespace TrackerNTaskMgr.Api.DTOs;

public class TaskPriorityReadDto
{
    // public byte TaskPriorityId { get; set; }
    public string TaskPriorityName { get; set; } = string.Empty;
    public byte TaskPriorityOrder { get; set; }
    public string? TaskPriorityEmoji { get; set; }
}
