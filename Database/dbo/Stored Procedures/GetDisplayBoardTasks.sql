use TrackerNTaskMgt
go 

create or alter procedure GetDisplayBoardTask
as 
begin
  set nocount on;

select 
  t.TaskId,
  t.TaskTitle,
  t.ScheduledAt,
  t.Deadline,
  ts.TaskStatusName,
  ts.TaskStatusEmoji,
  tp.TaskPriorityName,
  tp.TaskPriorityEmoji
from Tasks t
join  TaskStatuses ts 
on t.TaskStatusId = ts.TaskStatusId
join TaskPriorities tp 
on t.TaskPriorityId = tp.TaskPriorityId
where t.DisplayAtBoard = 1
and t.Deleted is null 
and tp.Deleted is null 
and ts.Deleted is null 
order by Deadline desc, t.TaskPriorityId 
end