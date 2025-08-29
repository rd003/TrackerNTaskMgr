using Microsoft.Extensions.Options;

using MongoDB.Driver;

using TrackerNTaskMgr.Api.DTOs;

using TrackerNTaskMgr.Api.Entities;
using TrackerNTaskMgr.Api.Mappers;
using TrackerNTaskMgr.Api.Services;
using TrackerNTaskMgr.Api.Settings;

namespace TrackerNTaskMgr.Api.Services { }

public class TaskHeaderService : ITaskHeaderService
{
    private readonly IMongoCollection<TaskHeader> _taskHeaderCollection;

    public TaskHeaderService(IOptions<DatabaseSettings> dbSettings)
    {
        var client = new MongoClient(dbSettings.Value.ConnectionString);
        var db = client.GetDatabase(dbSettings.Value.DatabaseName);
        _taskHeaderCollection = db.GetCollection<TaskHeader>(dbSettings.Value.TaskHeaderCollectionName);
    }

    public async Task<TaskHeaderReadDto> CreateTaskHeaderAsync(TaskHeaderCreateDto taskHeaderToCreate)
    {
        var taskHeader = taskHeaderToCreate.ToTaskHeader();
        await _taskHeaderCollection.InsertOneAsync(taskHeader);
        return taskHeader.ToTaskHeaderReadDto();
    }

    public async Task<TaskHeaderReadDto> UpdateTaskHeaderAsync(TaskHeader taskHeaderToUpdate)
    {
        taskHeaderToUpdate.Updated = DateTimeOffset.UtcNow;
        await _taskHeaderCollection.ReplaceOneAsync(x => x.Id == taskHeaderToUpdate.Id, taskHeaderToUpdate);
        return taskHeaderToUpdate.ToTaskHeaderReadDto();
    }

    public async Task DeleteTaskHeaderAsync(string taskHeaderId)
    {
        var filterDefinition = Builders<TaskHeader>.Filter.Eq(x => x.Id, taskHeaderId);
        var updateDefinition = Builders<TaskHeader>.Update.Set(x => x.Deleted, DateTimeOffset.UtcNow);
        await _taskHeaderCollection.UpdateOneAsync(filterDefinition, updateDefinition);
    }

    public async Task<TaskHeaderReadDto?> GetTaskHeaderByIdAsync(string taskHeaderId)
    {
        var taskHeader = await _taskHeaderCollection.Find(x => x.Id == taskHeaderId && x.Deleted == null).FirstOrDefaultAsync();
        return taskHeader is null ? null : taskHeader.ToTaskHeaderReadDto();
    }

    public async Task<IEnumerable<TaskHeaderReadDto>> GetTaskHeadersAsync()
    {
        var taskHeaders = await _taskHeaderCollection
        .Find(a => a.Deleted == null)
        .Sort(Builders<TaskHeader>.Sort.Ascending(a => a.SortOrder))
        .ToListAsync();
        return taskHeaders.Select(x => x.ToTaskHeaderReadDto());
    }

}
