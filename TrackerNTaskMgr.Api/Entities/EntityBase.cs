namespace TrackerNTaskMgr.Api.Entities;

public class EntityBase
{
    public DateTime CreatedAtUtc { get; private set; } = DateTime.UtcNow;
    public DateTime? UpdatedAtUtc { get; private set; }
    public DateTime? DeletedAtUtc { get; private set; }

    protected void ModifyUpdated()
    {
        UpdatedAtUtc = DateTime.UtcNow;
    }

}