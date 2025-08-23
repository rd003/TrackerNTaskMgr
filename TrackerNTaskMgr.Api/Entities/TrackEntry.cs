using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TrackerNTaskMgr.Api.Entities;

public class TrackEntry
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = null!;

    [BsonElement("entryDate")]
    public DateTime EntryDate { get; set; }

    [BsonElement("sleptAt")]
    public DateTime SleptAt { get; set; }

    [BsonElement("wokeUpAt")]
    public DateTime WokeUpAt { get; set; }

    [BsonElement("napInMinutes")]
    public int? NapInMinutes { get; set; }

    [BsonElement("totalWorkInMinutes")]
    public int TotalWorkInMinutes { get; set; }

    [BsonElement("remarks")]
    public string? Remarks { get; set; }

    [BsonElement("createdAt")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [BsonElement("updatedAt")]
    public DateTime? UpdatedAt { get; set; }
}