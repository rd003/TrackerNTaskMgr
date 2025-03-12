namespace TrackerNTaskMgr.Api.Entities;

public class UserAccount
{
    public int UserAccountId { get; set; }
    public string Username { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
}