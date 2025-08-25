using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

using TrackerNTaskMgr.Api.Constants;

namespace TrackerNTaskMgr.Api.Entities;

public class TaskItem
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = null!;

    [BsonElement("taskHeaderId")]
    public string TaskHeaderId { get; set; } = null!;

    [BsonElement("title")]
    public string Title { get; set; } = null!;

    [BsonElement("uri")]
    public string? Uri { get; set; }

    [BsonElement("priority")]
    public TaskPriority Priority { get; set; }

    [BsonElement("status")]
    public Constants.TaskStatus Status { get; set; }

    [BsonElement("deadline")]
    [BsonRepresentation(BsonType.Document)]
    public DateTimeOffset? Deadline { get; set; }

    [BsonElement("scheduledAt")]
    [BsonRepresentation(BsonType.Document)]
    public DateTimeOffset? ScheduledAt { get; set; }

    [BsonElement("displayAtBoard")]
    public bool DisplayAtBoard { get; set; } = false;

    [BsonElement("subTasks")]
    public List<SubTask> SubTasks { get; set; } = [];

    [BsonElement("tags")]
    public List<string> Tags { get; set; } = [];

    [BsonElement("createdAt")]
    [BsonRepresentation(BsonType.Document)]
    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;

    [BsonElement("updatedAt")]
    [BsonRepresentation(BsonType.Document)]
    public DateTimeOffset? UpdatedAt { get; set; }

    [BsonElement("deletedAt")]
    [BsonRepresentation(BsonType.Document)]
    public DateTimeOffset? DeletedAt { get; set; }
}
