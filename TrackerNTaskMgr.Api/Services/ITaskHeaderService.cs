using TrackerNTaskMgr.Api.DTOs;

namespace TrackerNTaskMgr.Api.Services;

public interface ITaskHeaderService
{
    Task<TaskHeaderReadDto> CreateTaskHeaderAsync(TaskHeaderCreateDto taskHeaderToCreate);
    Task<TaskHeaderReadDto> UpdateTaskHeader(TaskHeaderUpdateDto taskHeaderToCreate);
}
