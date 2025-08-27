using Microsoft.Extensions.Options;

using MongoDB.Driver;

using TrackerNTaskMgr.Api.DTOs;
using TrackerNTaskMgr.Api.Entities;
using TrackerNTaskMgr.Api.Exceptions;
using TrackerNTaskMgr.Api.Settings;

namespace TrackerNTaskMgr.Api.Services;

public class AuthService : IAuthService
{
    private readonly IMongoCollection<User> _userCollection;

    public AuthService(IOptions<DatabaseSettings> dbSettings)
    {
        var client = new MongoClient(dbSettings.Value.ConnectionString);
        var db = client.GetDatabase(dbSettings.Value.DatabaseName);
        _userCollection = db.GetCollection<User>(dbSettings.Value.UserCollectionName);
    }

    public async Task<string> CreateUserAsync(SignupDto signupData)
    {
        var user = new User
        {
            CreatedAt = DateTimeOffset.UtcNow,
            UpdatedAt = null,
            Username = signupData.Username,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(signupData.Password)
        };
        await _userCollection.InsertOneAsync(user);
        return user.Id;
    }

    public async Task<UserDto> AuthenticateUser(LoginDto loginData)
    {
        var user = await _userCollection.Find(x => x.Username == loginData.Username).FirstAsync();
        if (user == null || !BCrypt.Net.BCrypt.Verify(loginData.Password, user.PasswordHash))
        {
            throw new UnAuthorizedUserException("Invalid credentials");
        }
        return new UserDto(user.Username);
    }

    public async Task<bool> HasAnyUserAsync()
    {
        return await _userCollection.Find(FilterDefinition<User>.Empty).AnyAsync();
    }
}
