using System.Data;

using Dapper;

using FluentValidation;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

using TrackerNTaskMgr.Api.DTOs;
using TrackerNTaskMgr.Api.Exceptions;
using TrackerNTaskMgr.Api.Extensions;

namespace TrackerNTaskMgr.Api.Controllers;

[ApiController]
[Route("/api/task-headers")]
public class TaskHeaderController : ControllerBase
{
   private readonly IConfiguration _config;
   private readonly string _connectionString;
   private readonly IValidator<TaskHeaderCreateDto> _createValidator;
   private readonly IValidator<TaskHeaderUpdateDto> _updateValidator;

   public TaskHeaderController(IConfiguration config, IValidator<TaskHeaderCreateDto> createValidator, IValidator<TaskHeaderUpdateDto> updateValidator)
   {
      _config = config;
      _connectionString = _config.GetConnectionString("Default");
      _createValidator = createValidator;
      _updateValidator = updateValidator;
   }

   [HttpGet]
   public async Task<IActionResult> GetTaskHeaders()
   {
      using IDbConnection connection = new SqlConnection(_connectionString);
      string sql = @"select
                      th.TaskHeaderId,
                      th.TaskHeaderTitle,
                      th.SortOrder 
                     from TaskHeaders th
                     where th.Deleted is null
                     order by th.SortOrder asc";
      var taskHeaders = await connection.QueryAsync<TaskHeaderReadDto>(sql);
      return Ok(taskHeaders);
   }

   [HttpGet("{taskHeaderId:int}", Name = nameof(GetTaskHeader))]
   public async Task<IActionResult> GetTaskHeader(int taskHeaderId)
   {
      using IDbConnection connection = new SqlConnection(_connectionString);

      string sql = @"select
                      th.TaskHeaderId,
                      th.TaskHeaderTitle,
                      th.SortOrder 
                     from TaskHeaders th
                     where th.Deleted is null and TaskHeaderId=@taskHeaderId";

      var taskHeader = await connection.QuerySingleOrDefaultAsync<TaskHeaderReadDto>(sql, new { taskHeaderId });

      if (taskHeader == null)
      {
         throw new NotFoundException($"TaskHeader with TaskHeaderId: {taskHeaderId} does not found.");
      }

      return Ok(taskHeader);
   }

   [HttpPost]
   public async Task<IActionResult> CreateTaskHeader(TaskHeaderCreateDto taskHeaderToCreate)
   {
      var validationResult = await _createValidator.ValidateAsync(taskHeaderToCreate);
      if (!validationResult.IsValid)
      {
         validationResult.AddToModelState(ModelState);
         return UnprocessableEntity(ModelState);
      }

      using IDbConnection connection = new SqlConnection(_connectionString);
      string sql = @"insert into TaskHeaders (TaskHeaderTitle,SortOrder) 
                    values (@TaskHeaderTitle,@SortOrder);
                    select scope_identity()";
      int createdId = await connection.ExecuteScalarAsync<int>(sql, taskHeaderToCreate);
      var createdTaskHeader = new TaskHeaderReadDto(createdId, taskHeaderToCreate.TaskHeaderTitle!, taskHeaderToCreate.SortOrder ?? 0);
      return CreatedAtRoute(nameof(GetTaskHeader), new { taskHeaderId = createdId }, createdTaskHeader);
   }

   [HttpPut("{taskHeaderId:int}")]
   public async Task<IActionResult> UpdateTaskHeader(int taskHeaderId, [FromBody] TaskHeaderUpdateDto taskHeaderToUpdate)
   {
      var validationResult = await _updateValidator.ValidateAsync(taskHeaderToUpdate);

      if (!validationResult.IsValid)
      {
         validationResult.AddToModelState(ModelState);
         return UnprocessableEntity(ModelState);
      }

      if (taskHeaderId != taskHeaderToUpdate.TaskHeaderId)
      {
         throw new BadRequestException("TaskHeaderId in query and body does not match.");
      }

      if (!await IsTaskHeaderExists(taskHeaderId))
      {
         throw new NotFoundException($"Task with TaskHeaderId: {taskHeaderId} does not found");
      }

      using IDbConnection connection = new SqlConnection(_connectionString);
      string sql = @"update TaskHeaders 
                    set TaskHeaderTitle=@TaskHeaderTitle,
                    SortOrder=@SortOrder
                    where TaskHeaderId=@TaskHeaderId";

      await connection.ExecuteAsync(sql, taskHeaderToUpdate);

      return Ok(taskHeaderToUpdate);
   }

   [HttpDelete("{taskHeaderId:int}")]
   public async Task<IActionResult> DeleteTaskHeader(int taskHeaderId)
   {
      if (!await IsTaskHeaderExists(taskHeaderId))
      {
         throw new NotFoundException($"Task with TaskHeaderId: {taskHeaderId} does not found");
      }

      using IDbConnection connection = new SqlConnection(_connectionString);
      string sql = @"update TaskHeaders
                    set Deleted=GETDATE()
                    where TaskHeaderId=@taskHeaderId";
      await connection.ExecuteAsync(sql, new { taskHeaderId });
      return NoContent();
   }

   private async Task<bool> IsTaskHeaderExists(int taskHeaderId)
   {
      using IDbConnection connection = new SqlConnection(_connectionString);
      string sql = "select case when exists (select 1 from TaskHeaders where Deleted is null and TaskHeaderId=@taskHeaderId) then 1 else 0 end";
      var result = await connection.QueryFirstAsync<bool>(sql, new { taskHeaderId });
      return result;
   }
}