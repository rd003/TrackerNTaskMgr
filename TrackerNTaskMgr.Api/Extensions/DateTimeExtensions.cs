namespace TrackerNTaskMgr.Api.Extensions;

public static class DateTimeExtensions
{
    private static readonly TimeZoneInfo IstTimeZone = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");

    public static DateTime ToIst(this DateTime utcDateTime)
    {
        return TimeZoneInfo.ConvertTimeFromUtc(utcDateTime, IstTimeZone);
    }

    public static DateTime ToUtc(this DateTime istDateTime)
    {
        return TimeZoneInfo.ConvertTimeToUtc(istDateTime, IstTimeZone);
    }
}