using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TrackerNTaskMgr.Api.Entities;

public class SubTask
{
    [BsonElement("id")]
    public string Id = Guid.NewGuid().ToString();

    [BsonElement("subTaskTitle")]
    public string SubTaskTitle { get; set; } = null!;

    [BsonElement("subTaskUri")]
    public string? SubTaskUri { get; set; }
}
