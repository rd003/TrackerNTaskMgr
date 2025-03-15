using System.Data;
using System.Transactions;
using Dapper;
using Microsoft.Data.SqlClient;
using TrackerNTaskMgr.Api.DTOs;
using TrackerNTaskMgr.Api.Entities;
using TrackerNTaskMgr.Api.Mappings;

namespace TrackerNTaskMgr.Api.Services;

public class TrackEntryService
{
    private readonly string _connectionString;
    private readonly IConfiguration _config;
    public TrackEntryService(string connectionString, IConfiguration config)
    {
        _connectionString = connectionString;
        _config = config;
    }

    public async Task<TrackEntryReadDto?> CreateTrackEntryAsync(TrackEntryCreateDto trackEntryToCreate)
    {
        using IDbConnection connection = new SqlConnection(_connectionString);
        // Craete task entry
        // create task remark if remark in not null
        // return created track entry with related data
        // use transaction
        using var scope = new TransactionScope();
        string trackEntryQuery = @"insert into TrackEntries(EntryDate,SleptAt,WokeUpAt,NapInMinutes,TotalWorkInMinutes)
                         values (@EntryDate,@SleptAt,@WokeUpAt,@NapInMinutes,@TotalWorkInMinutes);
                         select scope_identity();
                         ";
        int trackEntryId = await connection.ExecuteScalarAsync<int>(trackEntryQuery, trackEntryToCreate);

        if (!string.IsNullOrWhiteSpace(trackEntryToCreate.Remarks))
        {
            string trackEntryRemarkQuery = @"insert into TrackEntryRemarks (TrackEntryId,Remarks)
                                             values(@TrackEntryId,@Remarks);";
            await connection.ExecuteAsync(trackEntryRemarkQuery, new { TrackEntryId = trackEntryId, trackEntryToCreate.Remarks });
        }
        scope.Complete();
        return await GetTrackEntryAsync(trackEntryId);
    }

    public async Task<TrackEntryReadDto?> GetTrackEntryAsync(int id)
    {
        using IDbConnection connection = new SqlConnection(_connectionString);
        string sql = @"select  
                         te.TrackEntryId,
                         te.EntryDate,
                         te.SleptAt,
                         te.WokeUpAt,
                         te.NapInMinutes,
                         te.TotalSleep,
                         te.TotalWorkInMinutes
                         tr.TrackEntryId,
                         tr.Remarks
                       from TrackEntries te
                       left join TrackEntryRemarks tr
                       on te.TrackEntryId = tr.TrackEntryId
                       where te.Deleted is null te.TrackEntryId=@id
                       order by te.EntryDate desc
                        ";
        TrackEntryReadDto? trackEntry = (await connection.QueryAsync<TrackEntryReadDto, TrackEntryRemarkReadDto, TrackEntryReadDto>(
             sql: sql,
             map: (entry, remark) =>
             {
                 return entry with { TrackEntryRemark = remark }; // TrackEntryRemark is a Record we can't mutate it directly
             },
             param: new { id },
             splitOn: "TrackEntryId"
             )).FirstOrDefault();
        return trackEntry;
    }

    public async Task<IEnumerable<TrackEntryReadDto>> GetTrackEntiesAsync()
    {
        using IDbConnection connection = new SqlConnection(_connectionString);
        string sql = @"select  
                         te.TrackEntryId,
                         te.EntryDate,
                         te.SleptAt,
                         te.WokeUpAt,
                         te.NapInMinutes,
                         te.TotalSleep,
                         te.TotalWorkInMinutes
                         tr.TrackEntryId,
                         tr.Remarks
                       from TrackEntries te
                       left join TrackEntryRemarks tr
                       on te.TrackEntryId = tr.TrackEntryId
                       where te.Deleted is null
                       order by te.EntryDate desc
                        ";
        IEnumerable<TrackEntryReadDto> trackEntries = await connection.QueryAsync<TrackEntryReadDto, TrackEntryRemarkReadDto, TrackEntryReadDto>(
             sql: sql,
             map: (entry, remark) =>
             {
                 return entry with { TrackEntryRemark = remark }; // TrackEntryRemark is a Record we can't mutate it directly
             },
             splitOn: "TrackEntryId"
             );
        return trackEntries;
    }
}