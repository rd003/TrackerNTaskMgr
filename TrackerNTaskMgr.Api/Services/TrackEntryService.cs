using System.Data;
using System.Transactions;
using Dapper;
using Microsoft.Data.SqlClient;
using TrackerNTaskMgr.Api.DTOs;
using TrackerNTaskMgr.Api.Entities;

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

    public async System.Threading.Tasks.Task UpdateTrackEntryAsync(TrackEntryUpdateDto trackEntryToUpdate)
    {
        using IDbConnection connection = new SqlConnection(_connectionString);
        using var transactionScope = new TransactionScope();
        // updating TrackEntry
        string trackEntryQuery = @"Update TrasactionEntries set 
                                         EntryDate=@EntryDate,
                                         SleptAt=@SleptAt,
                                         WokeUpAt=@WokeUpAt,
                                         NapInMinutes=@NapInMinutes,
                                         TotalWorkInMinutes=@TotalWorkInMinutes
                                         where TrackEntryId=@TrackEntryId
                                         ";
        await connection.ExecuteAsync(trackEntryQuery, trackEntryToUpdate);

        // Updating TrackEntryRemark
        if (!string.IsNullOrWhiteSpace(trackEntryToUpdate.Remarks))
        {
            string trackEntryRemarkQuery = @"Update TrackEntryRemarks 
                                         set Remarks=@Remarks 
                                         where TrackEntryId=@TrackEntryId";
            await connection.ExecuteAsync(trackEntryRemarkQuery,
                                          new
                                          {
                                              TrackEntryId = trackEntryToUpdate.TrackEntryId,
                                              Remarks = trackEntryToUpdate.Remarks
                                          });
        }

        transactionScope.Complete();
    }


}