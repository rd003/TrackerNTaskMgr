using System.Data;

using Dapper;

using FluentValidation;

using JwtLib.Services;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

using TrackerNTaskMgr.Api.DTOs;
using TrackerNTaskMgr.Api.Extensions;

namespace TrackerNTaskMgr.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class AccountsController : ControllerBase
{
    private readonly IConfiguration _config;
    private readonly string _constr;
    private readonly IValidator<LoginDto> _loginValidator;
    private readonly ITokenService _tokenService;

    public AccountsController(IConfiguration config, IValidator<LoginDto> loginValidator, ITokenService tokenService)
    {
        _config = config;
        _constr = _config.GetConnectionString("Default");
        _loginValidator = loginValidator;
        _tokenService = tokenService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto loginModel)
    {
        // var validationResult = await _loginValidator.ValidateAsync(loginModel);
        // if (!validationResult.IsValid)
        // {
        //     validationResult.AddToModelState(ModelState);
        //     return UnprocessableEntity(ModelState);
        // }

        // using IDbConnection connection = new SqlConnection(_constr);
        // string sql = @"select UserAccountId,Username,PasswordHash from UserAccounts
        //   where Username=@username; 
        //  ";
        // var user = await connection.QueryFirstOrDefaultAsync<UserAccountDto>(sql, new { loginModel.Username });

        // if (user != null && BCrypt.Net.BCrypt.Verify(loginModel.Password, user.PasswordHash))
        // {
        //     return Ok("Logged in");
        // }
        // return Unauthorized();

        string username = "rd003";

        List<string> roles = ["admin"];

        Dictionary<string, object> additionalClaims = [];
        additionalClaims.Add("email", "rd003@example.com");
        additionalClaims.Add("foo", "bar");

        var jwt = _tokenService.GenerateAccessToken(username, roles, additionalClaims);

        return Ok(jwt);
    }
}