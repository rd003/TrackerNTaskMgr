namespace TrackerNTaskMgr.Api.Entities;

public class EntityBase
{
    public int Id { get; private set; }
    public DateTime CreatedAtUtc { get; private set; } = DateTime.UtcNow;
    public DateTime? UpdatedAtUtc { get; private set; }
    public DateTime? DeletedAtUtc { get; private set; }

    public void ModifyUpdated()
    {
        UpdatedAtUtc = DateTime.UtcNow;
    }

}