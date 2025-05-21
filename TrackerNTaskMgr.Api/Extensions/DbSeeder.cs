using System.Data;

using Dapper;

using Microsoft.Data.SqlClient;

namespace TrackerNTaskMgr.Api.Extensions;

public static class DbSeeder
{
    public static async Task SeedAsync(this IApplicationBuilder app)
    {
        try
        {
            var configuration = app.ApplicationServices.GetRequiredService<IConfiguration>();
            string connectionString = configuration.GetConnectionString("Default");
            await SeedUserAsync(connectionString);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            Console.WriteLine("Seed failed");
        }
    }

    private static async Task SeedUserAsync(string constr)
    {
        string username = "user";
        string passwordHash = BCrypt.Net.BCrypt.HashPassword("123"); // I have deliberitely used the weak password

        using IDbConnection connection = new SqlConnection(constr);

        string sql = @"
        if not exists(select 1 from UserAccounts)
        begin
          insert into UserAccounts (Username,PasswordHash)
          values (@username,@passwordHash);
        end  
        ";
        await connection.ExecuteAsync(sql, new { username, passwordHash });
    }
}