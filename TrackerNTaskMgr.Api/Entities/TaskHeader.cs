using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TrackerNTaskMgr.Api.Entities;

public class TaskHeader
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = null!;

    [BsonElement("taskHeaderTitle")]
    public string TaskHeaderTitle { get; set; } = null!;

    [BsonElement("created")]
    [BsonRepresentation(BsonType.Document)]
    public DateTimeOffset Created { get; set; } = DateTimeOffset.UtcNow;

    [BsonElement("sortOrder")]
    public int SortOrder { get; set; }

    [BsonElement("updated")]
    [BsonRepresentation(BsonType.Document)]
    public DateTimeOffset? Updated { get; set; }

    [BsonElement("deleted")]
    [BsonRepresentation(BsonType.Document)]
    public DateTimeOffset? Deleted { get; set; }
}
