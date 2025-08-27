using TrackerNTaskMgr.Api.DTOs;
using TrackerNTaskMgr.Api.Entities;

namespace TrackerNTaskMgr.Api.Services;

public interface ITaskHeaderService
{
    Task<TaskHeaderReadDto> CreateTaskHeaderAsync(TaskHeaderCreateDto taskHeaderToCreate);
    Task<TaskHeaderReadDto> UpdateTaskHeaderAsync(TaskHeader taskHeaderToCreate);
    Task DeleteTaskHeaderAsync(string taskHeaderId);
    Task<TaskHeaderReadDto?> GetTaskHeaderByIdAsync(string taskHeaderId);
    Task<IEnumerable<TaskHeaderReadDto>> GetTaskHeadersAsync();
}
