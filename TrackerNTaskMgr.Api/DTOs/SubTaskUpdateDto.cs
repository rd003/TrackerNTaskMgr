namespace TrackerNTaskMgr.Api.DTOs;

public class SubTaskUpdateDto
{
    // In UpdateTask sp, we have scenarios:
    // 1: User can update an existing subtask
    // 2: User can add a new one (for that we need to pass null as SubTaskId)
    public int? SubTaskId { get; set; }
    public string SubTaskTitle { get; set; } = string.Empty;
    public string? SubTaskUri { get; set; }
}