using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TrackerNTaskMgr.Api.Entities;

public class SubTask
{
    private string? _id;
    [BsonElement("id")]
    public string Id
    {
        get => _id ??= Guid.NewGuid().ToString();
        set => _id = value;
    }

    [BsonElement("subTaskTitle")]
    public string SubTaskTitle { get; set; } = null!;

    [BsonElement("subTaskUri")]
    public string? SubTaskUri { get; set; }
}
