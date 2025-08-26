namespace TrackerNTaskMgr.Api.DTOs;

public class SubTaskReadDto
{
    public string SubTaskId { get; set; } = null!;
    public string SubTaskTitle { get; set; } = string.Empty;
    public string SubTaskUri { get; set; } = string.Empty;
}
