namespace TrackerNTaskMgr.Api.Entities;
public class Task
{
    public int TaskId { get; set; }
    public int TaskHeaderId { get; set; }
    public string TaskTitle { get; set; } = string.Empty;
    public string? TaskUri { get; set; }
    public byte TaskPriorityId { get; set; }
    public byte TaskStatusId { get; set; }
    public DateTime? Deadline { get; set; }
    public DateTime? ScheduledAt { get; set; }
    public DateTime Created { get; set; }
    public DateTime? Updated { get; set; }
    public DateTime? Deleted { get; set; }
    public  ICollection<SubTask> SubTasks { get; set; } = new List<SubTask>();
    public TaskHeader TaskHeader { get; set; } = null!;
    public TaskPriority TaskPriority { get; set; } = null!;
    public TaskStatus TaskStatus { get; set; } = null!;
    public  ICollection<TaskTag> TaskTags { get; set; } = [];
}