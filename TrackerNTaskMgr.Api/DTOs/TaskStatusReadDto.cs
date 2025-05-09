namespace TrackerNTaskMgr.Api.DTOs;

public class TaskStatusReadDto
{
    public byte TaskStatusId { get; set; }
    public string TaskStatusName { get; set; } = string.Empty;
    public string? TaskStatusEmoji { get; set; }
}
