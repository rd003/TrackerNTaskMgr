using FluentValidation;

using TrackerNTaskMgr.Api.DTOs;

namespace TrackerNTaskMgr.Api.Validators;

public class TaskHeaderCreateValidator : AbstractValidator<TaskHeaderCreateDto>
{
    public TaskHeaderCreateValidator()
    {
        RuleFor(a => a.TaskHeaderTitle)
        .NotEmpty()
        .WithMessage("TaskHeaderTitle can not be empty");

        RuleFor(a => a.TaskHeaderTitle)
        .MaximumLength(30).WithMessage("TaskHeaderTitle can not exceed 30 characters");

        RuleFor(a => a.SortOrder)
        .NotNull()
        .WithMessage("SortOrder can not be null");
    }
}