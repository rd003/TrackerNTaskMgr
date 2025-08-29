using FluentValidation;

using TrackerNTaskMgr.Api.DTOs;

namespace TrackerNTaskMgr.Api.Validators;

public class TrackEntryUpdateValidator : AbstractValidator<TrackEntryUpdateDto>
{
    public TrackEntryUpdateValidator()
    {
        RuleFor(te => te.TrackEntryId).NotEmpty().NotEmpty().WithMessage("TrackEntryId can not be null");
        RuleFor(te => te.EntryDate).NotNull().WithMessage("EntryDate can not be null");
        RuleFor(te => te.SleptAt).NotNull().WithMessage("SleptAt can not be null");
        RuleFor(te => te.WokeUpAt).NotNull().WithMessage("WokeUpAt can not be null");
        RuleFor(te => te.TotalWorkInMinutes).NotNull().WithMessage("TotalWorkInMinutes can not be null");
        RuleFor(te => te.Remarks).MaximumLength(500).WithMessage("Remarks can not exceed 500 characters");
    }
}
