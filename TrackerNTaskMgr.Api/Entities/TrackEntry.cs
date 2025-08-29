using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TrackerNTaskMgr.Api.Entities;

public class TrackEntry
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = null!;

    [BsonElement("entryDate")]
    [BsonRepresentation(BsonType.Document)]
    public DateTimeOffset EntryDate { get; set; }

    [BsonElement("sleptAt")]
    [BsonRepresentation(BsonType.Document)]
    public DateTimeOffset SleptAt { get; set; }

    [BsonElement("wokeUpAt")]
    [BsonRepresentation(BsonType.Document)]
    public DateTimeOffset WokeUpAt { get; set; }

    [BsonElement("napInMinutes")]
    public int? NapInMinutes { get; set; }

    [BsonElement("totalWorkInMinutes")]
    public int TotalWorkInMinutes { get; set; }

    [BsonElement("remarks")]
    public string? Remarks { get; set; }

    [BsonElement("createdAt")]
    [BsonRepresentation(BsonType.Document)]
    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;

    [BsonElement("updatedAt")]
    [BsonRepresentation(BsonType.Document)]
    public DateTimeOffset? UpdatedAt { get; set; }
}