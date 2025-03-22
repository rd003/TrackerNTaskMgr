using System.Data;
using System.Diagnostics.CodeAnalysis;
using Dapper;
using Microsoft.Data.SqlClient;
using TrackerNTaskMgr.Api.DTOs;

namespace TrackerNTaskMgr.Api.Services;

public class TrackEntryService : ITrackEntryService
{
    private readonly string _connectionString;
    private readonly IConfiguration _config;
    public TrackEntryService(IConfiguration config)
    {
        _config = config;
        _connectionString = _config.GetConnectionString("Default")!;

    }

    public async Task<TrackEntryReadDto?> CreateTrackEntryAsync(TrackEntryCreateDto trackEntryToCreate)
    {
        using IDbConnection connection = new SqlConnection(_connectionString);
        
        var parameters = new DynamicParameters(trackEntryToCreate);
        // Input params
        parameters.Add("@EntryDate", trackEntryToCreate.EntryDate);
        parameters.Add("@SleptAt", trackEntryToCreate.SleptAt);
        parameters.Add("@WokeUpAt", trackEntryToCreate.WokeUpAt);
        parameters.Add("@NapInMinutes", trackEntryToCreate.NapInMinutes);
        parameters.Add("@TotalWorkInMinutes", trackEntryToCreate.TotalWorkInMinutes);
        parameters.Add("@Remarks", trackEntryToCreate.Remarks);
        
        // output params
        parameters.Add("@TrackEntryId", dbType: DbType.Int32, direction: ParameterDirection.Output);
        
        await connection.ExecuteAsync("CreateTrackEntry", parameters,commandType:CommandType.StoredProcedure);

        int trackEntryId = parameters.Get<int>("@TrackEntryId");
        
        // I could get CreatedTrackEntry from the stored procedure. It does the job in one single database call.
        // But I have deliberately chosen this approach. I am good with multiple db roundtrips for the sake of consitency and code duplication.
        // It would be hard to maintain if parameter increases or decreases in future, I have to change it in two places. That is why I am doing this
        
        return await GetTrackEntryAsync(trackEntryId);
    }

    public async Task<TrackEntryReadDto?> GetTrackEntryAsync(int id)
    {
        using IDbConnection connection = new SqlConnection(_connectionString);

        TrackEntryReadDto? trackEntry = (await connection.QueryAsync<TrackEntryReadDto, TrackEntryRemarkReadDto, TrackEntryReadDto>(
             sql: "GetTrackEntryById",
             map: (entry, remark) =>
             {
                 entry.TrackEntryRemark = remark;
                 return entry; 
             },
             param: new { TrackEntryId=id },
             splitOn: "TrackEntryId",
             commandType:CommandType.StoredProcedure
             )).FirstOrDefault();
        return trackEntry;
    }

   public async Task<IEnumerable<TrackEntryReadDto>> GetTrackEntiesAsync(GetTrackEntriesParams parameters)
    {
        using IDbConnection connection = new SqlConnection(_connectionString);
        
        IEnumerable<TrackEntryReadDto> trackEntries = await connection.QueryAsync<TrackEntryReadDto, TrackEntryRemarkReadDto, TrackEntryReadDto>(
             sql: "GetTrackEntries",
             param: parameters,
             map: (entry, remark) =>
             {
                 entry.TrackEntryRemark = remark;
                 return entry;
             },
             splitOn: "TrackEntryId",
             commandType: CommandType.StoredProcedure
             );
        return trackEntries;
    }

    public async System.Threading.Tasks.Task UpdateTrackEntryAsync(TrackEntryUpdateDto trackEntryToUpdate)
    {
        using IDbConnection connection = new SqlConnection(_connectionString);
        await connection.ExecuteAsync("UpdateTrackEntry", trackEntryToUpdate, commandType: CommandType.StoredProcedure);
    }

    public async System.Threading.Tasks.Task DeleteTrackEntryAsync(int trackEntryId)
    {
        using IDbConnection connection = new SqlConnection(_connectionString);
        string query = @"update TransactionEntries
                         set Deleted=getdate() 
                         where TrackEntryId=@trackEntryId";
        // I have deleberately skip to soft delete the entry in TrackEntryRemarks                 
        await connection.ExecuteAsync(query, new { trackEntryId });
    }

}