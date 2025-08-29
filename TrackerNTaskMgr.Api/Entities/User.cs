using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TrackerNTaskMgr.Api.Entities;

public class User
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = null!;

    [BsonElement("username")]
    public string Username { get; set; } = null!;

    [BsonElement("passwordHash")]
    public string PasswordHash { get; set; } = null!;

    [BsonElement("createdAt")]
    public DateTimeOffset CreatedAt { get; set; } = DateTime.UtcNow;

    [BsonElement("updatedAt")]
    public DateTimeOffset? UpdatedAt { get; set; }
}