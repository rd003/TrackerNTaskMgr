
using System.Linq.Expressions;

using Microsoft.Extensions.Options;

using MongoDB.Driver;

using TrackerNTaskMgr.Api.Entities;
using TrackerNTaskMgr.Api.Settings;

namespace TrackerNTaskMgr.Api.Services;

public interface IDatabaseInitializer
{
    Task InitializeAsync();
}

public class DatabaseInitializer : IDatabaseInitializer
{
    private readonly IMongoDatabase _database;
    private readonly IMongoCollection<TrackEntry> _trackEntriesCollection;

    public DatabaseInitializer(IOptions<DatabaseSettings> databaseSettings)
    {
        var mongoClient = new MongoClient(databaseSettings.Value.ConnectionString);
        _database = mongoClient.GetDatabase(databaseSettings.Value.DatabaseName);
        _trackEntriesCollection = _database.GetCollection<TrackEntry>(databaseSettings.Value.TrackEntryCollectionName);
    }

    public async Task InitializeAsync()
    {
        await CreateIndexesAsync();
    }

    private async Task CreateIndexesAsync()
    {
        await CreateIndex(_trackEntriesCollection, x => x.EntryDate, "track_entry_email_unique", unique: true);
    }

    private async Task CreateIndex<T>(IMongoCollection<T> collection, Expression<Func<T, object>> field, string indexName, bool unique = false)
    {
        // Check if index already exists
        var existingIndexes = await collection.Indexes.ListAsync();
        var indexList = await existingIndexes.ToListAsync();

        if (indexList.Any(index => index["name"] == indexName))
        {
            return;
        }

        var indexKeysDefinition = Builders<T>.IndexKeys.Ascending(field);
        var indexModel = new CreateIndexModel<T>(indexKeysDefinition, new CreateIndexOptions { Name = indexName, Unique = unique });

        try
        {
            await collection.Indexes.CreateOneAsync(indexModel);
            Console.WriteLine($"====> index : {indexName} is created");
        }
        catch (MongoCommandException ex) when (ex.CodeName == "IndexOptionsConflict")
        {
            Console.WriteLine($"====> Index Conflict. Index :{indexName} is already created with different options... Ignore this.");
        }
    }
}