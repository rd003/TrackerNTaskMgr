using TrackerNTaskMgr.Api.DTOs;

namespace TrackerNTaskMgr.Api.Services;

public interface ITaskService
{
    Task<string> CreateTaskAsync(TaskCreateDTO taskCreate);
    Task UpdateTaskAsync(TaskUpdateDto taskToUpdate);
    Task<TaskReadDTO?> GetTaskByTaskIdAsync(string taskId);
    System.Threading.Tasks.Task DeleteTask(string taskId);
    Task<bool> IsTaskExists(string taskId);
    Task<IEnumerable<TaskReadDTO>> GetTasksAsync(GetTasksParams parameters);
    Task<IEnumerable<DisplayBoardTaskDto>> GetDisplayBoardTasksAsync();
    Task<IEnumerable<TagReadDto>> GetAllTagsAsync();
    Task<IEnumerable<TaskStatusSelect>> GetTaskStatusesAsync();
    Task<IEnumerable<TaskPrioritySelect>> GetTaskPrioritiesAsync();
}