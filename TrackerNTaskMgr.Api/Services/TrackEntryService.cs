using System.Data;
using Dapper;
using Microsoft.Data.SqlClient;
using TrackerNTaskMgr.Api.DTOs;

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

    public async Task<TrackEntryReadDto> CreateTrackEntryAsync(TrackEntryCreateDto trackEntry)
    {
        using IDbConnection connection = new SqlConnection(_connectionString);
        string query = "";
        int id = await connection.ExecuteScalarAsync<int>(query, trackEntry);
        return new TrackHead
    }
}