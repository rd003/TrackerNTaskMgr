using FluentValidation;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using TrackerNTaskMgr.Api.DTOs;
using TrackerNTaskMgr.Api.Exceptions;
using TrackerNTaskMgr.Api.Extensions;
using TrackerNTaskMgr.Api.Mappers;
using TrackerNTaskMgr.Api.Services;

namespace TrackerNTaskMgr.Api.Controllers;

[ApiController]
[Authorize]
[Route("/api/task-headers")]
public class TaskHeaderController : ControllerBase
{
   private readonly IValidator<TaskHeaderCreateDto> _createValidator;
   private readonly IValidator<TaskHeaderUpdateDto> _updateValidator;
   private readonly ITaskHeaderService _taskHeaderService;

   public TaskHeaderController(IValidator<TaskHeaderCreateDto> createValidator, IValidator<TaskHeaderUpdateDto> updateValidator, ITaskHeaderService taskHeaderService)
   {
      _createValidator = createValidator;
      _updateValidator = updateValidator;
      _taskHeaderService = taskHeaderService;
   }

   [HttpGet]
   public async Task<IActionResult> GetTaskHeaders()
   {
      return Ok(await _taskHeaderService.GetTaskHeadersAsync());
   }

   [HttpGet("{taskHeaderId:length(24)}", Name = nameof(GetTaskHeader))]
   public async Task<IActionResult> GetTaskHeader(string taskHeaderId)
   {
      var taskHeader = await _taskHeaderService.GetTaskHeaderByIdAsync(taskHeaderId);

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

      TaskHeaderReadDto createdTaskHeader = await _taskHeaderService.CreateTaskHeaderAsync(taskHeaderToCreate);
      return CreatedAtRoute(nameof(GetTaskHeader), new { taskHeaderId = createdTaskHeader.TaskHeaderId }, createdTaskHeader);
   }

   [HttpPut("{taskHeaderId:length(24)}")]
   public async Task<IActionResult> UpdateTaskHeader(string taskHeaderId, [FromBody] TaskHeaderUpdateDto taskHeaderToUpdate)
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

      TaskHeaderReadDto? existingTaskHeader = await _taskHeaderService.GetTaskHeaderByIdAsync(taskHeaderId);

      if (existingTaskHeader == null)
      {
         throw new NotFoundException($"Task with TaskHeaderId: {taskHeaderId} does not found");
      }

      var updatedTaskHeader = await _taskHeaderService.UpdateTaskHeaderAsync(taskHeaderToUpdate.ToTaskHeader());

      return Ok(updatedTaskHeader);
   }

   [HttpDelete("{taskHeaderId:length(24)}")]
   public async Task<IActionResult> DeleteTaskHeader(string taskHeaderId)
   {
      TaskHeaderReadDto? existingTaskHeader = await _taskHeaderService.GetTaskHeaderByIdAsync(taskHeaderId);

      if (existingTaskHeader == null)
      {
         throw new NotFoundException($"Task with TaskHeaderId: {taskHeaderId} does not found");
      }

      await _taskHeaderService.DeleteTaskHeaderAsync(taskHeaderId);
      return NoContent();
   }

}