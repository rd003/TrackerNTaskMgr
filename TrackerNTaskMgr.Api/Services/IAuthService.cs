using TrackerNTaskMgr.Api.DTOs;

namespace TrackerNTaskMgr.Api.Services;

public interface IAuthService
{
    Task<string> CreateUserAsync(SignupDto signupData);
    Task<UserDto> AuthenticateUser(LoginDto loginData);
    Task<bool> HasAnyUserAsync();
}
