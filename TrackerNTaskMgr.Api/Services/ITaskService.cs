using TrackerNTaskMgr.Api.DTOs;

namespace TrackerNTaskMgr.Api.Services;

public interface ITaskService
{
    Task<int> CreateTaskAsync(TaskCreateDTO taskCreate);
    Task UpdateTaskAsync(TaskUpdateDto taskToUpdate);
    Task<TaskReadDTO?> GetTaskByTaskIdAsync(int taskId);
    System.Threading.Tasks.Task DeleteTask(int taskId);
    Task<bool> IsTaskExists(int taskId);
    Task<IEnumerable<TaskReadDTO>> GetTasksAsync(GetTasksParams parameters);
    Task<IEnumerable<TagReadDto>> GetAllTagsAsync();
}