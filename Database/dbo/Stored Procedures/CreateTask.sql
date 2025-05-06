use TrackerNTaskMgt;
go

create or alter procedure CreateTask

    @TaskHeaderId INT,
    @TaskTitle NVARCHAR(50),
    @TaskUri VARCHAR(300) = NULL,
    @TaskPriorityId TINYINT,
    @TaskStatusId TINYINT,
    @Deadline DATETIME2(7) = NULL,
    @ScheduledAt DATETIME2(7) = NULL,

    -- SubTasks and Tags parameters (as TVPs - Table Valued Parameters)
    @SubTasks [dbo].[typSubTask] READONLY,
    @StringTags [dbo].[typTagString] READONLY,
    @TagIds [dbo].[typTagId] READONLY,

    @TaskId INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @ErrorMessage NVARCHAR(4000);
    DECLARE @ErrorSeverity INT;
    DECLARE @ErrorState INT;

    BEGIN TRY
        BEGIN TRANSACTION;
        INSERT INTO Tasks
        (
        TaskHeaderId,
        TaskTitle,
        TaskUri,
        TaskPriorityId,
        TaskStatusId,
        Deadline,
        ScheduledAt
        )
    VALUES(
            @TaskHeaderId,
            @TaskTitle,
            @TaskUri,
            @TaskPriorityId,
            @TaskStatusId,
            @Deadline,
            @ScheduledAt
        );

        SET @TaskId = SCOPE_IDENTITY();

        IF EXISTS (SELECT 1
    FROM @SubTasks)
        BEGIN
        INSERT INTO SubTasks
            (
            TaskId,
            SubTaskTitle,
            SubTaskUri
            )
        SELECT
            @TaskId,
            SubTaskTitle,
            SubTaskUri
        FROM @SubTasks;
    END

        -- CASE: When TagId is present in the DB 
        IF EXISTS (SELECT 1
    FROM @TagIds)
        BEGIN
        INSERT INTO TaskTags
            (TaskId,TagId)
        SELECT @TaskId, TagId
        FROM @TagIds;
    END

        -- Case: When TagId is not present in the DB
        -- We need to insert tag in the Tags table, then insert it's id in the TaskTags table.
        -- But how to do that?
        IF EXISTS (SELECT 1
    FROM @StringTags)
        BEGIN
        DECLARE @NewTagIds TABLE (TagId INT);

        INSERT INTO Tags
            (TagName)
        OUTPUT inserted.TagId INTO @NewTagIds
        SELECT DISTINCT st.TagName
        FROM @StringTags st
            LEFT JOIN Tags t
            ON st.TagName = t.TagName
        WHERE t.TagId IS NULL;
        -- We are making sure that tag is not present in the DB

        -- Now inert tagIds in TaskTags table

        INSERT INTO TaskTags
            (TaskId,TagId)
        SELECT @TaskId, TagId
        FROM @NewTagIds;
    END


        COMMIT TRANSACTION;
    END TRY 

    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        SELECT @ErrorMessage = ERROR_MESSAGE(),
        @ErrorSeverity = ERROR_SEVERITY(),
        @ErrorState = ERROR_STATE()

        -- Re-trhow error
        
        RAISERROR(@ErrorMessage,@ErrorSeverity,@ErrorState);
    END CATCH
END    
