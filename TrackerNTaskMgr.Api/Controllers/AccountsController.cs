using System.Data;

using Dapper;

using FluentValidation;

using Microsoft.AspNetCore.Connections;
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

    public AccountsController(IConfiguration config, IValidator<LoginDto> loginValidator)
    {
        _config = config;
        _constr = _config.GetConnectionString("Default");
        _loginValidator = loginValidator;
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

        using IDbConnection connection = new SqlConnection(_constr);
        string sql = @"select UserAccountId,Username,PasswordHash from UserAccounts
          where Username=@username and PasswordHash=@password; 
         ";
        var user = await connection.QueryFirstOrDefaultAsync<UserAccountDto>(sql, loginModel);
        if (user is null)
        {
            return Unauthorized();
        }
        return Ok("Logged in");
    }

}