using System.Data;

using FluentValidation;

using JwtLib.Services;

using Microsoft.AspNetCore.Mvc;

using TrackerNTaskMgr.Api.DTOs;
using TrackerNTaskMgr.Api.Extensions;
using TrackerNTaskMgr.Api.Services;

namespace TrackerNTaskMgr.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class AccountsController : ControllerBase
{
    private readonly IValidator<LoginDto> _loginValidator;
    private readonly ITokenService _tokenService;
    private readonly IAuthService _authService;

    public AccountsController(IValidator<LoginDto> loginValidator, ITokenService tokenService, IAuthService authService)
    {
        _loginValidator = loginValidator;
        _tokenService = tokenService;
        _authService = authService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto loginModel)
    {
        var validationResult = await _loginValidator.ValidateAsync(loginModel);
        if (!validationResult.IsValid)
        {
            validationResult.AddToModelState(ModelState);
            return UnprocessableEntity(ModelState);
        }
        var user = await _authService.AuthenticateUser(loginModel);
        var jwt = _tokenService.GenerateAccessToken(user.Username);
        return Ok(jwt);
    }
}