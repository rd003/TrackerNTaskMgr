namespace TrackerNTaskMgr.Api.Entities;

public class SubTask : EntityBase
{
    public int SubTaskId { get; private set; }
    public int TaskId { get; private set; }
    public string Title { get; private set; } = string.Empty;
    public string? ShortDescription { get; private set; }
    public Uri? Uri { get; private set; }

    private SubTask(int taskId, string title, string? shortDescription, Uri? uri)
    {

    }
}