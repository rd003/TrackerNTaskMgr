using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

using TrackerNTaskMgr.Api.Constants;

namespace TrackerNTaskMgr.Api.Entities;

public class TaskItem
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = null!;

    [BsonElement("title")]
    public string Title { get; set; } = null!;

    [BsonElement("uri")]
    public string? Uri { get; set; }

    [BsonElement("priority")]
    public TaskPriority Priority { get; set; }

    [BsonElement("status")]
    public Constants.TaskStatus Status { get; set; }

    [BsonElement("deadline")]
    public DateTime? Deadline { get; set; }

    [BsonElement("scheduledAt")]
    public DateTime? ScheduledAt { get; set; }

    [BsonElement("displayAtBoard")]
    public bool DisplayAtBoard { get; set; } = false;

    [BsonElement("subTasks")]
    public List<SubTask> SubTasks { get; set; } = [];

    [BsonElement("tags")]
    public List<string> Tags { get; set; } = [];

    [BsonElement("createdAt")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [BsonElement("updatedAt")]
    public DateTime? UpdatedAt { get; set; }

    [BsonElement("deletedAt")]
    public DateTime? DeletedAt { get; set; }
}
