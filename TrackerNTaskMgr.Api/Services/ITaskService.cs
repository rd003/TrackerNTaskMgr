using TrackerNTaskMgr.Api.DTOs;

namespace TrackerNTaskMgr.Api.Services;

public interface ITaskService
{
    Task<int> CreateTaskAsync(TaskCreateDTO taskCreate);
    Task UpdateSubTask(TaskUpdateDto taskToUpdate);
    Task<TaskReadDTO?> GetTaskByTaskIdAsync(int taskId);
    Task<IEnumerable<TagReadDto>> GetAllTagsAsync();
    System.Threading.Tasks.Task DeleteTask(int taskId);
}