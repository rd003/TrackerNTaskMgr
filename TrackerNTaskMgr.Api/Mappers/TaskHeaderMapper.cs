using TrackerNTaskMgr.Api.DTOs;
using TrackerNTaskMgr.Api.Entities;

namespace TrackerNTaskMgr.Api.Mappers;

public static class TaskHeaderMapper
{
    public static TaskHeader ToTaskHeader(this TaskHeaderCreateDto taskHeader)
    {
        return new TaskHeader
        {
            TaskHeaderTitle = taskHeader.TaskHeaderTitle!,
            SortOrder = taskHeader.SortOrder ?? 0,
            Created = DateTimeOffset.UtcNow,
        };
    }

    public static TaskHeader ToTaskHeader(this TaskHeaderUpdateDto taskHeader)
    {
        return new TaskHeader
        {
            Id = taskHeader.TaskHeaderId!,
            TaskHeaderTitle = taskHeader.TaskHeaderTitle!,
            SortOrder = taskHeader.SortOrder ?? 0,
            Updated = DateTimeOffset.UtcNow
        };
    }

    public static TaskHeaderReadDto ToTaskHeaderReadDto(this TaskHeaderUpdateDto taskHeader)
    {
        return new TaskHeaderReadDto(taskHeader.TaskHeaderId!, taskHeader.TaskHeaderTitle!, taskHeader.SortOrder ?? 0);
    }

    public static TaskHeader ToTaskHeader(this TaskHeaderReadDto taskHeader)
    {
        return new TaskHeader
        {
            Id = taskHeader.TaskHeaderId,
            TaskHeaderTitle = taskHeader.TaskHeaderTitle,
            SortOrder = taskHeader.SortOrder,
            Updated = DateTimeOffset.UtcNow
        };
    }

    public static TaskHeaderReadDto ToTaskHeaderReadDto(this TaskHeader taskHeader)
    {
        return new TaskHeaderReadDto(taskHeader.Id, taskHeader.TaskHeaderTitle, taskHeader.SortOrder);
    }


}
