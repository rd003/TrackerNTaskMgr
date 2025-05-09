using TrackerNTaskMgr.Api.DTOs;

namespace TrackerNTaskMgr.Api.Services;

public interface ITaskService
{
    Task<int> CreateTaskAsync(TaskCreateDTO taskCreate);
    Task<TaskReadDTO?> GetTaskByTaskIdAsync(int taskId);
}