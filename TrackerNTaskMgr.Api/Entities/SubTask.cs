namespace TrackerNTaskMgr.Api.Entities;

public class SubTask
{
    public int SubTaskId { get; set; }
    public int TaskId { get; set; }
    public string SubTaskTitle { get; set; } = string.Empty;
    public string SubTaskUri { get; set; } = string.Empty;
    public DateTime Created { get; set; }
    public DateTime? Updated { get; set; }
    public DateTime? Deleted { get; set; }
    public Task? Task { get; set; }
}