using System.Data;

using Microsoft.Extensions.Options;

using MongoDB.Driver;

using TrackerNTaskMgr.Api.DTOs;
using TrackerNTaskMgr.Api.Entities;
using TrackerNTaskMgr.Api.Exceptions;
using TrackerNTaskMgr.Api.Mappers;
using TrackerNTaskMgr.Api.Settings;

namespace TrackerNTaskMgr.Api.Services;

public class TrackEntryService : ITrackEntryService
{
    private readonly IMongoCollection<TrackEntry> _trackEntriesCollection;

    public TrackEntryService(IOptions<DatabaseSettings> databaseSettings)
    {
        var mongoClient = new MongoClient(databaseSettings.Value.ConnectionString);
        var mongoDatabase = mongoClient.GetDatabase(databaseSettings.Value.DatabaseName);
        _trackEntriesCollection = mongoDatabase.GetCollection<TrackEntry>(databaseSettings.Value.TrackEntryCollectionName);
    }

    public async Task<TrackEntryReadDto> CreateTrackEntryAsync(TrackEntryCreateDto trackEntryToCreate)
    {
        var trackEntry = trackEntryToCreate.ToTrackEntry();
        // remove time from entry date 
        trackEntry.EntryDate = trackEntry.EntryDate.Date;

        var existingRecord = await _trackEntriesCollection.Find(x => x.EntryDate == trackEntry.EntryDate).FirstOrDefaultAsync();
        if (existingRecord != null)
        {
            throw new DuplicateRecordException("Record with this entryDate already exists");
        }

        await _trackEntriesCollection.InsertOneAsync(trackEntry);
        var createdEntry = trackEntry.ToTrackEntryReadDto();
        return createdEntry;
    }

    public async Task UpdateTrackEntryAsync(TrackEntryUpdateDto trackEntryToUpdate)
    {
        var trackEntry = trackEntryToUpdate.ToTrackEntry();

        // remove time from entry date
        trackEntry.EntryDate = trackEntry.EntryDate.Date;

        await _trackEntriesCollection.ReplaceOneAsync(a => a.Id == trackEntryToUpdate.TrackEntryId, trackEntry);
    }


    public async Task<TrackEntryReadDto?> GetTrackEntryAsync(string id)
    {
        var trackEntry = await _trackEntriesCollection.Find(a => a.Id == id).FirstOrDefaultAsync();
        return trackEntry == null ? default : trackEntry.ToTrackEntryReadDto();
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
            filter &= filterBuilder.And(
                filterBuilder.Gte(x => x.EntryDate, parameters.StartDate),
                filterBuilder.Lte(x => x.EntryDate, parameters.EndDate)
            );
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


    public async Task DeleteTrackEntryAsync(string trackEntryId)
    {
        await _trackEntriesCollection.DeleteOneAsync(a => a.Id == trackEntryId);
    }

}