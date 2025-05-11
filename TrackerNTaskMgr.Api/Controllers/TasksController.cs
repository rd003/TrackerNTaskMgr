using FluentValidation;

using Microsoft.AspNetCore.Mvc;

using TrackerNTaskMgr.Api.DTOs;
using TrackerNTaskMgr.Api.Exceptions;
using TrackerNTaskMgr.Api.Extensions;
using TrackerNTaskMgr.Api.Services;

namespace TrackerNTaskMgr.Api.Controllers;

[ApiController]
[Route("/api/{controller}")]
public class TasksController : ControllerBase
{
    private readonly ITaskService _taskService;
    private readonly IValidator<TaskCreateDTO> _taskCreateValidator;
    public TasksController(ITaskService taskService, IValidator<TaskCreateDTO> taskCreateValidator)
    {
        _taskService = taskService;
        _taskCreateValidator = taskCreateValidator;
    }

    [HttpPost]
    public async Task<IActionResult> CreateTask(TaskCreateDTO taskToCreate)
    {
        var validationResult = await _taskCreateValidator.ValidateAsync(taskToCreate);
        if (!validationResult.IsValid)
        {
            validationResult.AddToModelState(ModelState);
            return UnprocessableEntity(ModelState);
        }
        var createdTaskId = await _taskService.CreateTaskAsync(taskToCreate);
        var createdTask = await _taskService.GetTaskByTaskIdAsync(createdTaskId);
        return CreatedAtRoute(nameof(GetTaskById), new { taskId = createdTaskId }, createdTask);
    }

    [HttpPut("{taskId:int}")]
    public async Task<IActionResult> UpdateTask(int taskId, [FromBody] TaskUpdateDto taskToUpdate)
    {
        if (taskId != taskToUpdate.TaskId)
        {
            throw new BadRequestException("TaskId from parameter and body mismatches");
        }

        bool isTaskExists = await _taskService.IsTaskExists(taskId);
        if (!isTaskExists)
        {
            throw new NotFoundException($"Task with TaskId:{taskId} does not found");
        }

        await _taskService.UpdateTaskAsync(taskToUpdate);
        var updatedTask = await _taskService.GetTaskByTaskIdAsync(taskId);
        return Ok(updatedTask);
    }

    [HttpGet("{taskId:int}", Name = nameof(GetTaskById))]
    public async Task<IActionResult> GetTaskById(int taskId)
    {
        var task = await _taskService.GetTaskByTaskIdAsync(taskId);
        if (task == null)
        {
            throw new NotFoundException($"Task with TaskId:{taskId} does not found");
        }
        return Ok(task);
    }


    [HttpDelete("{taskId:int}")]
    public async Task<IActionResult> DeleteTask(int taskId)
    {
        bool isTaskExists = await _taskService.IsTaskExists(taskId);
        if (!isTaskExists)
        {
            throw new NotFoundException($"Task with TaskId:{taskId} does not found");
        }
        await _taskService.DeleteTask(taskId);
        return NoContent();
    }

    [HttpGet("/api/tags")]
    public async Task<IActionResult> GetTags()
    {
        return Ok(await _taskService.GetAllTagsAsync());
    }

}