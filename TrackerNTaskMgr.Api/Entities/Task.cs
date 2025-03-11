using TrackerNTaskMgr.Api.Constants;

namespace TrackerNTaskMgr.Api.Entities;

public class Task : EntityBase
{
    public int TaskId { get; private set; }
    public int TaskHeaderId { get; private set; }
    public string Title { get; private set; } = string.Empty;
    public string? ShortDescription { get; private set; }
    public Priority Priority { get; private set; }
    public Uri? Uri { get; private set; }
    public DateTime? Deadline { get; private set; }
    public DateTime? ScheduledAt { get; private set; }
    public Constants.TaskStatus TaskStatus { get; private set; } = Constants.TaskStatus.Pending;
    public bool DisplayAtBoard { get; private set; }


    private Task(int taskHeaderId, string title, string? shortDescription, Priority priority, Uri uri, DateTime? deadline, DateTime? scheduledAt, bool displayAtBoard)
    {
        TaskHeaderId = taskHeaderId;
        Title = title;
        ShortDescription = shortDescription;
        Priority = priority;
        Uri = uri;
        Deadline = deadline;
        ScheduledAt = scheduledAt;
        DisplayAtBoard = displayAtBoard;
    }

    public static Task Create(int taskHeaderId, string title, string? shortDescription, Priority priority, Uri uri, DateTime? deadline, DateTime? scheduledAt, Constants.TaskStatus taskStatus, bool displayAtBoard)
    {
        ValidateInputs(taskHeaderId, title, shortDescription);
        return new Task(taskHeaderId, title, shortDescription, priority, uri, deadline, scheduledAt, displayAtBoard);
    }

    public void Update(int taskHeaderId, string title, string? shortDescription, Priority priority, Uri uri, DateTime? deadline, DateTime? scheduledAt, Constants.TaskStatus taskStatus, bool displayAtBoard)
    {
        ValidateInputs(taskHeaderId, title, shortDescription);
        TaskHeaderId = taskHeaderId;
        Title = title;
        ShortDescription = shortDescription;
        Priority = priority;
        Uri = uri;
        Deadline = deadline;
        ScheduledAt = scheduledAt;
        TaskStatus = taskStatus;
        DisplayAtBoard = displayAtBoard;

        ModifyUpdated();
    }

    private static void ValidateInputs(int taskHeaderId, string title, string? shortDescription)
    {
        if (taskHeaderId < 0)
        {
            throw new ArgumentException("TaskHeaderId must be greater than 0", nameof(taskHeaderId));
        }

        if (string.IsNullOrWhiteSpace(title))
        {
            throw new ArgumentException("Title can't be null", nameof(taskHeaderId));
        }

        if (!string.IsNullOrWhiteSpace(shortDescription))
        {
            if (shortDescription.Length > 200)
            {
                throw new ArgumentException("", nameof(shortDescription));
            }
        }
    }
}