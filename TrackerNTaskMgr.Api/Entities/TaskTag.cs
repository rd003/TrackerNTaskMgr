namespace TrackerNTaskMgr.Api.Entities;
public class TaskTag
{
    public int TaskId { get; set; }
    public int TagId { get; set; }
    public DateTime Created { get; set; }
    public DateTime? Updated { get; set; }
    public DateTime? Deleted { get; set; }
    public Tag Tag { get; set; } = null!;
    public Task Task { get; set; } = null!;
}