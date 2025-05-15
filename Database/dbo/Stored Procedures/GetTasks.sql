use TrackerNTaskMgt
go

create or alter procedure GetTasks
    @TaskHeaderId int=null,
    @TaskPriorityId int=null,
    @TagId int=null,
    @SortBy nvarchar(20)=null,
    @SortDirection nvarchar(4) = 'desc'
as
begin
    set nocount on;

    if(@SortBy is not null and (LOWER(@SortBy) not in ('scheduledat','deadline')))
    begin
      RAISERROR('Invalid @SortBy value. You can only sort by ''Deadline'' or ''ScheduledAt''.', 16, 1);
      RETURN;
    end 

    if(@SortDirection is not null and (LOWER(@SortDirection) not in ('asc','desc')))
    begin
      RAISERROR('Invalid @SortDirection value. Use only ''asc'' or ''desc''.', 16, 1);
      RETURN;
    end   

    declare @sql NVARCHAR(MAX);

    set @sql=   'SELECT
        t.TaskId,
        t.TaskTitle,
        t.TaskUri,
        t.TaskHeaderId,
        t.TaskPriorityId,
        t.TaskStatusId,
        t.ScheduledAt,
        t.DisplayAtBoard,
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
        st.SubTaskUri,
        tg.TagName
    from Tasks t
        join TaskHeaders th
        on t.TaskHeaderId=th.TaskHeaderId
        join TaskPriorities tp
        on t.TaskPriorityId = tp.TaskPriorityId
        join TaskStatuses ts
        on t.TaskStatusId = ts.TaskStatusId
        join SubTasks st
        on t.TaskId = st.TaskId
        join TaskTags tt
        on t.TaskId = tt.TaskId
        join Tags tg
        on tt.TagId = tg.TagId
    where t.Deleted is null
        and th.Deleted is null
        and tp.Deleted is null
        and ts.Deleted is null
        and st.Deleted is null
        and tg.Deleted is null
        and tt.Deleted is null';

    if(@TaskHeaderId is not null)
      set @sql = @sql+ ' and t.TaskHeaderId = @TaskHeaderId';

    if(@TaskPriorityId is not null)
      set @sql = @sql + ' and t.TaskPriorityId = @TaskPriorityId';

  -- eliminate null from date column if someone sort by ScheduledAt or Deadline
   if(@SortBy is not null)
    begin
        if(lower(@SortBy)= 'scheduledat')
          set @sql = @sql + ' and t.ScheduledAt is not null';

        if(lower(@SortBy)= 'deadline')
          set @sql = @sql + ' and t.Deadline  is not null';
    end

    -- sorting
    if(@SortBy is not null)
    begin
       if(lower(@SortBy)= 'scheduledat')
       begin
         set @sql = @sql + ' order by t.ScheduledAt';
         
         if(lower(@SortDirection)='desc') 
            set @sql = @sql + ' desc';
       end

       if(lower(@SortBy)= 'deadline')
       begin
         set @sql = @sql + ' order by t.Deadline';
         
         if(lower(@SortDirection)='desc')
            set @sql = @sql + ' desc';        
       end
    end
    else 
       set @sql = @sql+ ' order by th.SortOrder asc, tp.TaskPriorityOrder asc';    

    print @sql;
    execute sp_executesql @sql,N'@TaskHeaderId int,@TaskPriorityId int,@TagId int,@SortBy nvarchar(20),@SortDirection nvarchar(4)', @TaskHeaderId,@TaskPriorityId,@TagId,@SortBy,@SortDirection
end 

