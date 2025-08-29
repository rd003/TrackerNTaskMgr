using TrackerNTaskMgr.Api.Constants;
using TrackerNTaskMgr.Api.DTOs;
using TrackerNTaskMgr.Api.Entities;

namespace TrackerNTaskMgr.Api.Mappers;

public static class TaskMapper
{
    public static TaskItem ToTaskItem(this TaskCreateDTO task)
    {
        return new TaskItem
        {
            TaskHeaderId = task.TaskHeaderId ?? "",
            Title = task.TaskTitle ?? "",
            Uri = task.TaskUri,
            ScheduledAt = task.ScheduledAt,
            Deadline = task.Deadline,
            CreatedAt = DateTimeOffset.UtcNow,
            DisplayAtBoard = task.DisplayAtBoard,
            Priority = (TaskPriority)task.TaskPriorityId!,
            Status = (Constants.TaskStatus)task.TaskStatusId!,
            Tags = task.Tags!.Split(',').ToList(),
            SubTasks = task.SubTasks.Select(a => a.ToSubTask()).ToList(),
        };
    }

    public static TaskItem ToTaskItem(this TaskUpdateDto task)
    {
        return new TaskItem
        {
            Id = task.TaskId!,
            TaskHeaderId = task.TaskHeaderId ?? "",
            Title = task.TaskTitle ?? "",
            Uri = task.TaskUri,
            ScheduledAt = task.ScheduledAt,
            Deadline = task.Deadline,
            UpdatedAt = DateTimeOffset.UtcNow,
            DisplayAtBoard = task.DisplayAtBoard,
            Priority = (TaskPriority)task.TaskPriorityId!,
            Status = (Constants.TaskStatus)task.TaskStatusId!,
            Tags = task.Tags!.Split(',').ToList(),
            SubTasks = task.SubTasks.Select(a => a.ToSubTask()).ToList(),
        };
    }


}
