using FluentValidation;

using Microsoft.AspNetCore.Mvc;

using TrackerNTaskMgr.Api.DTOs;
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
        // var createdId = await _taskService.CreateTaskAsync(taskToCreate);
        return Ok();
    }
}