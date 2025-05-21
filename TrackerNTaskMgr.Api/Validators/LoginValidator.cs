using FluentValidation;

using TrackerNTaskMgr.Api.DTOs;

namespace TrackerNTaskMgr.Api.Validators;

public class LoginValidator : AbstractValidator<LoginDto>
{
  public LoginValidator()
  {
    RuleFor(l => l.Username).NotNull().WithMessage("Username can not be null");

    RuleFor(l => l.Username).Empty().WithMessage("Username can not be empty");

    RuleFor(l => l.Password).NotNull().WithMessage("Password can not be null");

    RuleFor(l => l.Password).Empty().WithMessage("Password can not be empty");
  }
}