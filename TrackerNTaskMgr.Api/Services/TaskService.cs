using System.Data;

using Dapper;

using Microsoft.Data.SqlClient;

using TrackerNTaskMgr.Api.DTOs;

namespace TrackerNTaskMgr.Api.Services;

public class TaskService : ITaskService
{
    private readonly IConfiguration _configuration;
    private readonly string _connectionString;

    public TaskService(IConfiguration configuration)
    {
        _configuration = configuration;
        _connectionString = _configuration.GetConnectionString("Default");
    }

    public async Task<int> CreateTaskAsync(TaskCreateDTO taskCreate)
    {
        IDbConnection connection = new SqlConnection(_connectionString);

        DataTable tags = new();
        tags.Columns.Add("TagName", typeof(string));

        foreach (var tag in taskCreate.Tags)
        {
            tags.Rows.Add(tag.ToLower());
        }

        DataTable subTasks = new();
        subTasks.Columns.Add("SubTaskTitle", typeof(string));
        subTasks.Columns.Add("SubTaskUri", typeof(string));

        foreach (var subTask in taskCreate.SubTasks)
        {
            subTasks.Rows.Add(subTask.SubTaskTitle, subTask.SubTaskUri);
        }

        var parameters = new DynamicParameters();
        parameters.Add("@TaskHeaderId", taskCreate.TaskHeaderId, DbType.Int32, ParameterDirection.Input);
        parameters.Add("@TaskTitle", taskCreate.TaskTitle, DbType.String, ParameterDirection.Input);
        parameters.Add("@TaskUri", taskCreate.TaskUri, DbType.String, ParameterDirection.Input);
        parameters.Add("@TaskPriorityId", taskCreate.TaskPriorityId, DbType.Byte, ParameterDirection.Input);
        parameters.Add("@TaskStatusId", taskCreate.TaskStatusId, DbType.Byte, ParameterDirection.Input);
        parameters.Add("@Deadline", taskCreate.Deadline, DbType.DateTime2, ParameterDirection.Input);
        parameters.Add("@ScheduledAt", taskCreate.ScheduledAt, DbType.DateTime2, ParameterDirection.Input);
        parameters.Add("@SubTasks", subTasks, DbType.Object, ParameterDirection.Input);
        parameters.Add("@Tags", tags, DbType.Object, ParameterDirection.Input);
        parameters.Add("@TaskId", dbType: DbType.Int32, direction: ParameterDirection.Output);

        await connection.ExecuteAsync("CreateTask", parameters, commandType: CommandType.StoredProcedure);

        int taskId = parameters.Get<int>("@TaskId");
        return taskId;
    }
}

