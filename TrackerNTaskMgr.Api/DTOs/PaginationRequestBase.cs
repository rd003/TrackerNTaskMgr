namespace TrackerNTaskMgr.Api.DTOs;

public record PaginationRequestBase(int Limit=10,int LastId=0);
