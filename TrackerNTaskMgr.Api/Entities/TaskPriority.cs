namespace TrackerNTaskMgr.Api.Entities;

public class TaskPriority
{
    public byte TaskPriorityId { get; set; }
    public string TaskPriorityName { get; set; } = string.Empty;
    public byte TaskPriorityOrder { get; set; }
    public string? TaskPriorityEmoji { get; set; }
    public DateTime Created { get; set; }
    public DateTime? Updated { get; set; }
    public DateTime? Deleted { get; set; }
    public ICollection<Task> Tasks { get; set; } =[];
}