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
        using IDbConnection connection = new SqlConnection(_connectionString);

        DataTable tags = new();
        tags.Columns.Add("TagName", typeof(string));
        
        if(!string.IsNullOrWhiteSpace(taskCreate.Tags))
        {
            var tagsArray= taskCreate.Tags.Split(",");
            foreach (var tag in tagsArray)
            {
                tags.Rows.Add(tag.ToLower());
            }
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
        parameters.Add("@DisplayAtBoard", taskCreate.DisplayAtBoard, DbType.Boolean);
        parameters.Add("@SubTasks", subTasks, DbType.Object, ParameterDirection.Input);
        parameters.Add("@Tags", tags, DbType.Object, ParameterDirection.Input);
        parameters.Add("@TaskId", dbType: DbType.Int32, direction: ParameterDirection.Output);

        await connection.ExecuteAsync("CreateTask", parameters, commandType: CommandType.StoredProcedure);

        int taskId = parameters.Get<int>("@TaskId");
        return taskId;
    }

    public async Task UpdateTaskAsync(TaskUpdateDto taskToUpdate)
    {
        using IDbConnection connection = new SqlConnection(_connectionString);

        DataTable subTasks = new();
        subTasks.Columns.Add("@SubTaskId", typeof(int));
        subTasks.Columns.Add("SubTaskTitle", typeof(string));
        subTasks.Columns.Add("SubTaskUri", typeof(string));

        foreach (var subTask in taskToUpdate.SubTasks)
        {
            subTasks.Rows.Add(subTask.SubTaskId, subTask.SubTaskTitle, subTask.SubTaskUri);
        }

        DataTable tags = new();
        tags.Columns.Add("@TagName", typeof(string));

        if(!string.IsNullOrWhiteSpace(taskToUpdate.Tags))
        {
            var tagsArray= taskToUpdate.Tags.Split(",");
            foreach (var tag in tagsArray)
            {
                tags.Rows.Add(tag.ToLower());
            }
        }

        var parameters = new DynamicParameters();
        parameters.Add("@TaskId", taskToUpdate.TaskId, DbType.Int32);
        parameters.Add("@TaskHeaderId", taskToUpdate.TaskHeaderId, DbType.Int32, ParameterDirection.Input);
        parameters.Add("@TaskTitle", taskToUpdate.TaskTitle, DbType.String, ParameterDirection.Input);
        parameters.Add("@TaskUri", taskToUpdate.TaskUri, DbType.String, ParameterDirection.Input);
        parameters.Add("@TaskPriorityId", taskToUpdate.TaskPriorityId, DbType.Byte, ParameterDirection.Input);
        parameters.Add("@TaskStatusId", taskToUpdate.TaskStatusId, DbType.Byte, ParameterDirection.Input);
        parameters.Add("@Deadline", taskToUpdate.Deadline, DbType.DateTime2, ParameterDirection.Input);
        parameters.Add("@ScheduledAt", taskToUpdate.ScheduledAt, DbType.DateTime2, ParameterDirection.Input);
        parameters.Add("@DisplayAtBoard", taskToUpdate.DisplayAtBoard, DbType.Boolean);
        parameters.Add("@SubTasks", subTasks, DbType.Object, ParameterDirection.Input);
        parameters.Add("@Tags", tags, DbType.Object, ParameterDirection.Input);

        await connection.ExecuteAsync("UpdateTask", parameters, commandType: CommandType.StoredProcedure);
    }

    public async Task<TaskReadDTO?> GetTaskByTaskIdAsync(int taskId)
    {
        using IDbConnection connection = new SqlConnection(_connectionString);

        Dictionary<int, TaskReadDTO> taskDict = new();

        await connection.QueryAsync<TaskReadDTO, TaskStatusReadDto, TaskPriorityReadDto, SubTaskReadDto, TagDto, TaskReadDTO>("GetTaskByTaskId", (task, taskStatus, taskPriority, subTask, tag) =>
        {
            if (!taskDict.TryGetValue(task.TaskId, out TaskReadDTO cachedTask))
            {
                cachedTask = task;
                cachedTask.SubTasks = [];
                cachedTask.Tags = [];
                cachedTask.TaskStatus = taskStatus;
                cachedTask.TaskPriority = taskPriority;
                taskDict.Add(task.TaskId, cachedTask);

            }

            // Add the subtask if it's not null and not already in the list
            if (subTask != null && subTask.SubTaskId != 0 && !cachedTask.SubTasks.Any(st => st.SubTaskId == subTask.SubTaskId))
            {
                cachedTask.SubTasks.Add(subTask);
            }

            // Add the tag if it's not null and not already in the list
            if (tag != null && !string.IsNullOrEmpty(tag.TagName) && !cachedTask.Tags.Any(tg => tg == tag.TagName))
            {
                cachedTask.Tags.Add(tag.TagName);
            }

            return cachedTask;
        }, new { @TaskId = taskId }, splitOn: "TaskStatusName,TaskPriorityName,SubTaskId,TagName", commandType: CommandType.StoredProcedure);

        return taskDict.Values.FirstOrDefault();
    }

    public async Task<IEnumerable<TaskReadDTO>> GetTasksAsync(GetTasksParams parameters)
    {
        using IDbConnection connection = new SqlConnection(_connectionString);
        
        var taskDictionary = new Dictionary<int,TaskReadDTO>();

        await connection.QueryAsync<TaskReadDTO,TaskStatusReadDto, TaskPriorityReadDto, SubTaskReadDto, TagDto, TaskReadDTO>("GetTasks",(task, taskStatus, taskPriority, subTask, tag)=>{
            if(!taskDictionary.TryGetValue(task.TaskId,out TaskReadDTO taskRead))
            {
                taskRead = task;
                taskRead.Tags=[];
                taskRead.SubTasks=[];
                taskRead.TaskStatus=taskStatus;
                taskRead.TaskPriority=taskPriority;
                taskDictionary.Add(task.TaskId,taskRead);
            }

            // avoid duplicate subtask
            if(subTask!=null && subTask.SubTaskId!=0 && ! taskRead.SubTasks.Any(a=>a.SubTaskId==subTask.SubTaskId))
            {
                taskRead.SubTasks.Add(subTask);
            }

            // avoid duplicate tags
            if(tag!=null && !string.IsNullOrEmpty(tag.TagName) && !taskRead.Tags.Contains(tag.TagName))
            {
                taskRead.Tags.Add(tag.TagName);
            }

            return taskRead;
        },parameters,splitOn:"TaskStatusName,TaskPriorityName,SubTaskId,TagName",commandType:CommandType.StoredProcedure);

        return taskDictionary.Values;

        // I am unable to do this, please help me
    }


    public async Task<bool> IsTaskExists(int taskId)
    {
        using IDbConnection connection = new SqlConnection(_connectionString);
        string sql = @"SELECT CASE
                       WHEN EXISTS(SELECT 1 FROM Tasks where TaskId=@TaskId and Deleted is null)
                       THEN 1
                       ELSE 0
                       END";
        bool exists = await connection.QueryFirstAsync<bool>(sql, new { taskId });
        return exists;
    }

    public async System.Threading.Tasks.Task DeleteTask(int taskId)
    {
        using IDbConnection connection = new SqlConnection(_connectionString);
        await connection.ExecuteAsync("DeleteTask", new { taskId }, commandType: CommandType.StoredProcedure);
    }

    public async Task<IEnumerable<DisplayBoardTaskDto>> GetDisplayBoardTasksAsync()
    {
        using IDbConnection connection = new SqlConnection(_connectionString);
        var tasks= await connection.QueryAsync<DisplayBoardTaskDto>("GetDisplayBoardTask",commandType:CommandType.StoredProcedure);
        return tasks;
    }

    public async Task<IEnumerable<TaskStatusSelect>> GetTaskStatusesAsync()
    {
       using IDbConnection connection = new SqlConnection(_connectionString);
       string sql = @"select 
                        ts.TaskStatusId,
                        ts.TaskStatusName + ' ' + 
                        ts.TaskStatusEmoji as TaskStatusName
                    from TaskStatuses ts
                    where ts.Deleted is null
                    ";
       var taskStatuses = await connection.QueryAsync<TaskStatusSelect>(sql);   
       return taskStatuses;                 
    }

    public async Task<IEnumerable<TaskPrioritySelect>> GetTaskPrioritiesAsync()
    {
        using IDbConnection connection = new SqlConnection(_connectionString);
        string sql = @"select 
                        tp.TaskPriorityId,
                        tp.TaskPriorityName + ' ' + 
                        tp.TaskPriorityEmoji as TaskPriorityName
                    from TaskPriorities tp
                    where tp.Deleted is null";
        var taskPriorities = await connection.QueryAsync<TaskPrioritySelect>(sql);
        return taskPriorities;
    }

    public async Task<IEnumerable<TagReadDto>> GetAllTagsAsync()
    {
        using IDbConnection connection = new SqlConnection(_connectionString);
        string sql = @"select TagId, TagName from Tags where deleted is null";
        var tags = await connection.QueryAsync<TagReadDto>(sql);
        return tags;
    }
}

