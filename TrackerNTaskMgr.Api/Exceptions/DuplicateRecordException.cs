namespace TrackerNTaskMgr.Api.Exceptions;

public class DuplicateRecordException : Exception
{
    public DuplicateRecordException(string message) : base(message)
    {

    }
}
