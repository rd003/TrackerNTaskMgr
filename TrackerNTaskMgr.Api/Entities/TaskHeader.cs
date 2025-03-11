namespace TrackerNTaskMgr.Api.Entities;

public class TaskHeader : EntityBase
{
    public int TaskHeaderId { get; private set; }
    public string Title { get; private set; } = string.Empty;
    public int DisplayOrder { get; private set; }


    private TaskHeader(string title, int displayOrder)
    {
        Title = title;
        DisplayOrder = displayOrder;
    }

    public static TaskHeader Create(string title, int displayOrder)
    {
        ValidateInputs(title, displayOrder);
        return new TaskHeader(title, displayOrder);
    }

    public void Update(string title, int displayOrder)
    {
        ValidateInputs(title, displayOrder);
        Title = title;
        ModifyUpdated();
    }

    private static void ValidateInputs(string title, int displayOrder)
    {
        if (string.IsNullOrWhiteSpace(title))
        {
            throw new ArgumentNullException(title, "Title can not be null");
        }
        if (displayOrder < 0 || displayOrder > 20)
        {
            throw new ArgumentException("Display order must be between 0 and 24", nameof(displayOrder));
        }
    }
}