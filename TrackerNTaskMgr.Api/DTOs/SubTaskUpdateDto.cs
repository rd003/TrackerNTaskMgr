namespace TrackerNTaskMgr.Api.DTOs;

public class SubTaskUpdateDto
{
    public int SubTaskId { get; set; }
    public string SubTaskTitle { get; set; } = string.Empty;
    public string SubTaskUri { get; set; } = string.Empty;
}