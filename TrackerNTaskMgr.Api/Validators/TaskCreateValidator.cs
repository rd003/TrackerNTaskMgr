using FluentValidation;

using TrackerNTaskMgr.Api.DTOs;

namespace TrackerNTaskMgr.Api.Validators;

public class TaskCreateValidator : AbstractValidator<TaskCreateDTO>
{
    public TaskCreateValidator()
    {
        RuleFor(t => t.TaskHeaderId).NotNull().WithMessage("TaskHeader can not be null");
        RuleFor(t => t.TaskTitle).NotNull().WithMessage("TaskTitle can not be null");
        RuleFor(t => t.TaskTitle).NotEmpty().WithMessage("TaskTitle can not be empty");
        RuleFor(t => t.TaskTitle).MaximumLength(50).WithMessage("TaskTitle can not exceed 50 characters");
        RuleFor(t => t.TaskUri).MaximumLength(300).WithMessage("TaskUri can not exceed 50 characters");
        RuleFor(t => t.TaskPriorityId).NotNull().WithMessage("TaskPriorityId can not be null");
        RuleFor(t => t.TaskStatusId).NotNull().WithMessage("TaskStatusId can not be null");
    }
}