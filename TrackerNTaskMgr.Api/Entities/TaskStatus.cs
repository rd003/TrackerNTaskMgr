namespace TrackerNTaskMgr.Api.Entities;

public class TaskStatus
{
    public byte TaskStatusId { get; set; }
    public string TaskStatusName { get; set; } = string.Empty;
    public string? TaskStatusEmoji { get; set; }
    public DateTime Created { get; set; }
    public DateTime? Updated { get; set; }
    public DateTime? Deleted { get; set; }
    public  ICollection<Task> Tasks { get; set; } = [];
}