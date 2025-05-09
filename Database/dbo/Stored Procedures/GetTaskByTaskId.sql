USE TrackerNTaskMgt
GO

CREATE OR ALTER PROCEDURE dbo.GetTaskByTaskId
    @TaskId int
AS
BEGIN
    SELECT
        t.TaskId,
        t.TaskTitle,
        t.TaskUri,
        t.TaskHeaderId,
        t.TaskPriorityId,
        t.TaskStatusId,
        t.ScheduledAt,
        t.Deadline,
        th.TaskHeaderTitle,
        ts.TaskStatusName,
        ts.TaskStatusEmoji,
        tp.TaskPriorityName,
        tp.TaskPriorityOrder,
        tp.TaskPriorityEmoji,
        st.SubTaskId,
        st.TaskId,
        st.SubTaskTitle,
        st.SubTaskTitle,
        st.SubTaskUri
    from Tasks t
        join TaskHeaders th
        on t.TaskHeaderId=th.TaskHeaderId
        join TaskPriorities tp
        on t.TaskPriorityId = tp.TaskPriorityId
        join TaskStatuses ts
        on t.TaskStatusId = ts.TaskStatusId
        join SubTasks st
        on t.TaskId = st.TaskId
    where t.Deleted is null
        and th.Deleted is null
        and tp.Deleted is null
        and ts.Deleted is null
        and st.Deleted is null
        and t.TaskId=@TaskId
END