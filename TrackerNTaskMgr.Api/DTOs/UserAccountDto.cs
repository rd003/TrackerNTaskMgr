namespace TrackerNTaskMgr.Api.DTOs;

public class UserAccountDto
{
    public int UserAccountId { get; set; }
    public string Username { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;

    public override string ToString()
    {
        return $"UserAccountId: {UserAccountId}, Username: {Username}";
    }
}