using FluentValidation;

using TrackerNTaskMgr.Api.DTOs;

namespace TrackerNTaskMgr.Api.Validators;

public class LoginValidator : AbstractValidator<LoginDto>
{
  public LoginValidator()
  {
    RuleFor(l => l.Username).NotEmpty().WithMessage("Username can not be empty");
    RuleFor(l => l.Password).NotEmpty().WithMessage("Password can not be empty");
  }
}