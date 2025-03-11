using TrackerNTaskMgr.Api.Constants;

namespace TrackerNTaskMgr.Api.Entities;

public class Task : EntityBase
{
    public int TaskId { get; private set; }
    public int TaskHeaderId { get; private set; }
    public string Title { get; private set; } = string.Empty;
    public string ShortDescription { get; private set; } = string.Empty;
    public Priority Priority { get; private set; }
    public Uri Uri { get; private set; } = null!;
    public DateTime? Deadline { get; private set; }
    public DateTime? ScheduledAt { get; private set; }
    public Constants.TaskStatus TaskStatus { get; private set; } = Constants.TaskStatus.Pending;

    private Task(int taskHeaderId, string title, string shortDescription, Priority priority, Uri uri, DateTime? deadline, DateTime? scheduledAt)
    {
        TaskHeaderId = taskHeaderId;
        Title = title;
        ShortDescription = shortDescription;
        Priority = priority;
        Uri = uri;
        Deadline = deadline;
        ScheduledAt = scheduledAt;
    }

    public Task Create(int taskHeaderId, string title, string shortDescription, Priority priority, Uri uri, DateTime? deadline, DateTime? scheduledAt, Constants.TaskStatus taskStatus)
    {
        return new Task(taskHeaderId, title, shortDescription, priority, uri, deadline, scheduledAt);
    }

    public void Update(int taskHeaderId, string title, string shortDescription, Priority priority, Uri uri, DateTime? deadline, DateTime? scheduledAt, Constants.TaskStatus taskStatus)
    {
        TaskHeaderId = taskHeaderId;
        Title = title;
        ShortDescription = shortDescription;
        Priority = priority;
        Uri = uri;
        Deadline = deadline;
        ScheduledAt = scheduledAt;
        TaskStatus = taskStatus;
        ModifyUpdated();
    }
}