namespace TrackerNTaskMgr.Api.Entities;
public  class Tag
{
    public int TagId { get; set; }
    public string TagName { get; set; } = string.Empty;
    public DateTime Created { get; set; }
    public DateTime? Updated { get; set; }
    public DateTime? Deleted { get; set; }
    public ICollection<TaskTag> TaskTags { get; set; } = [];
}