using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TrackerNTaskMgr.Api.Entities;

public class SubTask
{
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id = ObjectId.GenerateNewId().ToString();

    [BsonElement("subTaskTitle")]
    public string SubTaskTitle { get; set; } = null!;

    [BsonElement("subTaskUri")]
    public string? SubTaskUri { get; set; }

    [BsonElement("status")]
    public Constants.TaskStatus Status { get; set; }

    [BsonElement("createdAt")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [BsonElement("updatedAt")]
    public DateTime? UpdatedAt { get; set; }

    [BsonElement("deletedAt")]
    public DateTime? DeletedAt { get; set; }
}
