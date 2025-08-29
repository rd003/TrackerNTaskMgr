namespace TrackerNTaskMgr.Api.DTOs;

public class SubTaskUpdateDto
{
    public string? SubTaskId { get; set; }
    public string SubTaskTitle { get; set; } = string.Empty;
    public string? SubTaskUri { get; set; }
}