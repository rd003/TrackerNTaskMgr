using FluentValidation;

using TrackerNTaskMgr.Api.DTOs;

namespace TrackerNTaskMgr.Api.Validators;

public class TaskHeaderUpdateValidator : AbstractValidator<TaskHeaderUpdateDto>
{
    public TaskHeaderUpdateValidator()
    {  
        RuleFor(a=>a.TaskHeaderId)
        .NotNull()
        .WithMessage("TaskHeaderId can not be null");

        RuleFor(a=>a.TaskHeaderTitle)
        .NotNull()
        .WithMessage("TaskHeaderTitle can not be null");
        
        RuleFor(a=>a.TaskHeaderTitle)
        .NotEmpty()
        .WithMessage("TaskHeaderTitle can not be empty");
        
        RuleFor(a=>a.TaskHeaderTitle)
        .MaximumLength(30).WithMessage("TaskHeaderTitle can not exceed 30 characters");

        RuleFor(a=>a.SortOrder)
        .NotNull()
        .WithMessage("SortOrder can not be null");
    }
}