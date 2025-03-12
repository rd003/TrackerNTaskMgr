namespace TrackerNTaskMgr.Api.Entities;

public class TaskHeader
{
    public int TaskHeaderId { get; set; }
    public string TaskHeaderTitle { get; set; } = string.Empty;
    public DateTime Created { get; set; }
    public DateTime? Updated { get; set; }
    public DateTime? Deleted { get; set; }
    public ICollection<Task> Tasks { get; set; } = [];
}