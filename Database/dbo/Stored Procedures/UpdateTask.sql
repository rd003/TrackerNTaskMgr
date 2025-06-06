USE TrackerNTaskMgt
GO

create or alter procedure UpdateTask
  @TaskId INT,
  @TaskHeaderId INT,
  @TaskTitle NVARCHAR(50),
  @TaskUri VARCHAR(300) = NULL,
  @TaskPriorityId TINYINT,
  @TaskStatusId TINYINT,
  @Deadline DATETIME2(7) = NULL,
  @ScheduledAt DATETIME2(7) = NULL,
  @DisplayAtBoard BIT,

  -- SubTasks and Tags parameters (as TVPs - Table Valued Parameters)
  @SubTasks [dbo].[typSubTaskUpdate] READONLY,
  @Tags [dbo].[typTags] READONLY
as
begin
  set nocount on;
  begin try
      begin transaction;
      
      update Tasks 
      set Updated=GETDATE(),
      TaskHeaderId=@TaskHeaderId,
      TaskPriorityId=@TaskPriorityId,
      TaskStatusId=@TaskStatusId,
      TaskTitle=@TaskTitle,
      TaskUri=@TaskUri,
      DisplayAtBoard=@DisplayAtBoard,
      ScheduledAt=@ScheduledAt,
      Deadline=@Deadline 
      where TaskId=@TaskId;

      -- Delete subtasks if not passed in procedure

      update SubTasks set Deleted=GETDATE()
      where TaskId=@TaskId
    and SubTaskId not in (select SubTaskId
    from @SubTasks
    where SubTaskId is not null);    
      
      -- If a subtask exists then update


      if exists (select 1
  from SubTasks)
      begin

    update st
        set SubTaskTitle=inputSubTask.SubTaskTitle,
        SubTaskUri=inputSubTask.SubTaskUri,
        Updated= getdate()
        from SubTasks st
      inner join @SubTasks inputSubTask
      on st.SubTaskId = inputSubTask.SubTaskId
        where st.TaskId = @TaskId and inputSubTask.SubTaskId is not null


  end

    -- Insert new subtasks

    insert into SubTasks
    (TaskId,SubTaskTitle,SubTaskUri)
  SELECT
    @TaskId,
    ist.SubTaskTitle,
    ist.SubTaskUri
  from @SubTasks ist
  where ist.SubTaskId is null

      -- add tags if does not exists
      insert into tags
    (TagName)
  select distinct tg.TagName
  from @Tags tg
    left join Tags et
    on tg.TagName = et.TagName
  where et.TagId is null

  -- delete those tags which are not being passed
  -- Help me with that, give code of this section only for the sake of brevity

  UPDATE tt 
  SET tt.Deleted = GETDATE()
  from TaskTags tt
    join Tags tg
    on tt.TagId = tg.TagId
  where tt.TaskId = @TaskId and tg.TagId NOT IN (
    select tg.TagId
    from Tags tg
      inner join @Tags it
      on tg.TagName = it.TagName 
  ) 

   -- add non-existing tagId to corresponding TaskTags

   insert into TaskTags
    (TaskId, TagId)
  select @TaskId, t.TagId
  from Tags t
    inner join @Tags inputTag
    on t.TagName = inputTag.TagName
  where not exists (
    select 1
  from TaskTags tt
  where tt.TaskId = @TaskId
    and tt.TagId = t.TagId
    and tt.Deleted is null
);

      commit transaction;
    end try 

  begin catch
    declare @ErrorMessage NVARCHAR(400), @ErrorSeverity int,@ErrorState int;

    if(@@TRANCOUNT>0)
       ROLLBACK TRANSACTION;
    
    select @ErrorMessage=ERROR_MESSAGE(), @ErrorSeverity=ERROR_SEVERITY(), @ErrorState=ERROR_STATE();

    RAISERROR(@ErrorMessage,@ErrorSeverity,@ErrorState);    
  end catch
end