using FluentValidation;
using TrackerNTaskMgr.Api.DTOs;

namespace TrackerNTaskMgr.Api.Validators;

public class TrackEntryCreateDtoValidator : AbstractValidator<TrackEntryCreateDto>
{
    public TrackEntryCreateDtoValidator()
    {
        RuleFor(te => te.EntryDate).NotNull().WithMessage("EntryDate can not be null");
        RuleFor(te => te.SleptAt).NotNull().WithMessage("SleptAt can not be null");
        RuleFor(te => te.WokeUpAt).NotNull().WithMessage("WokeUpAt can not be null");
        RuleFor(te=>te.TotalWorkInMinutes).NotNull().WithMessage("TotalWorkInMinutes can not be null");
        RuleFor(te => te.Remarks).MaximumLength(1000).WithMessage("Remarks can not exceed 100 characters");

    }
}