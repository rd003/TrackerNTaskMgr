using System.Data;

using Dapper;

using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Options;

using MongoDB.Driver;

using TrackerNTaskMgr.Api.DTOs;
using TrackerNTaskMgr.Api.Entities;
using TrackerNTaskMgr.Api.Mappers;
using TrackerNTaskMgr.Api.Settings;

namespace TrackerNTaskMgr.Api.Services;

public class TrackEntryService : ITrackEntryService
{
    private readonly string _connectionString;
    private readonly IConfiguration _config;
    private readonly IMongoCollection<TrackEntry> _trackEntriesCollection;

    public TrackEntryService(IConfiguration config, IOptions<DatabaseSettings> databaseSettings)
    {
        _config = config;
        _connectionString = _config.GetConnectionString("Default")!;
        var mongoClient = new MongoClient(databaseSettings.Value.ConnectionString);
        var mongoDatabase = mongoClient.GetDatabase(databaseSettings.Value.DatabaseName);
        _trackEntriesCollection = mongoDatabase.GetCollection<TrackEntry>(databaseSettings.Value.TrackEntryCollectionName);
    }

    public async Task<TrackEntryReadDto> CreateTrackEntryAsync(TrackEntryCreateDto trackEntryToCreate)
    {
        var trackEntry = trackEntryToCreate.ToTrackEntry();
        await _trackEntriesCollection.InsertOneAsync(trackEntry);
        var createdEntry = trackEntry.ToTrackEntryReadDto();
        return createdEntry;
    }

    public async Task<TrackEntryReadDto?> GetTrackEntryAsync(int id)
    {
        // using IDbConnection connection = new SqlConnection(_connectionString);

        // TrackEntryReadDto? trackEntry = (await connection.QueryAsync<TrackEntryReadDto, TrackEntryRemarkReadDto, TrackEntryReadDto>(
        //      sql: "GetTrackEntryById",
        //      map: (entry, remark) =>
        //      {
        //          entry.TrackEntryRemark = remark;
        //          return entry;
        //      },
        //      param: new { TrackEntryId = id },
        //      splitOn: "TrackEntryId",
        //      commandType: CommandType.StoredProcedure
        //      )).FirstOrDefault();
        // return trackEntry;
        throw new NotImplementedException();
    }

    public async Task<IEnumerable<TrackEntryReadDto>> GetTrackEntiesAsync(GetTrackEntriesParams parameters)
    {
        var filterBuilder = Builders<TrackEntry>.Filter;
        var filter = filterBuilder.Empty;

        if (parameters.StartDate.HasValue && !parameters.EndDate.HasValue)
        {
            filter &= filterBuilder.Gte(x => x.EntryDate, parameters.StartDate);
        }

        if (parameters.StartDate.HasValue && parameters.EndDate.HasValue)
        {
            // TODO: How to apply both gte and lte
        }

        // Pagination filtering based on LastEntryDate and PageDirection
        if (parameters.LastEntryDate.HasValue)
        {
            if (parameters.PageDirection.Equals("NEXT", StringComparison.CurrentCultureIgnoreCase))
            {
                if (parameters.PageDirection.Equals("DESC", StringComparison.CurrentCultureIgnoreCase))
                    filter &= filterBuilder.Lt(x => x.EntryDate, parameters.LastEntryDate);
                else
                    filter &= filterBuilder.Gt(x => x.EntryDate, parameters.LastEntryDate);
            }
            else if (parameters.PageDirection.Equals("PREV", StringComparison.CurrentCultureIgnoreCase))
            {
                if (parameters.SortDirection.Equals("DESC", StringComparison.CurrentCultureIgnoreCase))
                    filter &= filterBuilder.Gt(x => x.EntryDate, parameters.LastEntryDate);
                else
                    filter &= filterBuilder.Lt(x => x.EntryDate, parameters.LastEntryDate);
            }
        }

        var sortBuilder = Builders<TrackEntry>.Sort;
        var sort = parameters.SortDirection.Equals("DESC", StringComparison.CurrentCultureIgnoreCase) ? sortBuilder.Descending(x => x.EntryDate) : sortBuilder.Ascending(x => x.EntryDate);

        var trackEntries = await _trackEntriesCollection
                           .Find(filter)
                            .Sort(sort)
                            .Limit(parameters.Limit)
                            .ToListAsync();

        return trackEntries.Select(te => te.ToTrackEntryReadDto());
    }

    public async Task UpdateTrackEntryAsync(TrackEntryUpdateDto trackEntryToUpdate)
    {
        // using IDbConnection connection = new SqlConnection(_connectionString);
        // await connection.ExecuteAsync("UpdateTrackEntry", trackEntryToUpdate, commandType: CommandType.StoredProcedure);
        throw new NotImplementedException();
    }

    public async System.Threading.Tasks.Task DeleteTrackEntryAsync(int trackEntryId)
    {
        using IDbConnection connection = new SqlConnection(_connectionString);
        await connection.ExecuteAsync("DeleteTrackEntry", new { TrackEntryId = trackEntryId }, commandType: CommandType.StoredProcedure);
    }


}