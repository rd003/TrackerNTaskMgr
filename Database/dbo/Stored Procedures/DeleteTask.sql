use TrackerNTaskMgt
GO

create or alter procedure DeleteTask
    @TaskId int
as
begin
    set nocount on;


    begin try  
     begin transaction;
     update Tasks set Deleted=GETDATE() where TaskId=@TaskId;
     update SubTasks set Deleted=GETDATE() where TaskId=@TaskId;
     update TaskTags set Deleted = GETDATE() where TaskId=@TaskId;
     commit transaction;
    end try 
    
    begin catch
    if(@@TRANCOUNT>0)
    begin
        rollback transaction;
    end

    declare @ErrorMessage nvarchar(400);
    declare @ErrorSeverity int;
    declare @ErrorState int;
    
    select @ErrorMessage= ERROR_MESSAGE(),
        @ErrorSeverity=ERROR_SEVERITY(),
        @ErrorState=ERROR_STATE();

    RAISERROR(@ErrorMessage,@ErrorSeverity,@ErrorState);

    end catch
end