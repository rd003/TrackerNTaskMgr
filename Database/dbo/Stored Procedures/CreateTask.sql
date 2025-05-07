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
    @Tags [dbo].[typTags] READONLY,

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
     
    -- How to insert values in TaskTags?
    -- We are getting list of TagName in @Tags
    -- Some of the tagName are present in the Tags table but some may not be
    -- We need to insert tagNames in Tags table, if they do not exist.
    -- Then We need to insert data in TaskTags table (TaskId,TagId)
    -- For that need to find ids of TagNames which were present in @Tags

    -- Inserting tags if not exists

       INSERT INTO Tags
        (TagName)
    SELECT DISTINCT t.TagName
    FROM @Tags t
        LEFT JOIN Tags et
        ON t.TagName = et.TagName
    WHERE et.TagId IS NULL;

    -- Inserting TaskTags

    INSERT INTO TaskTags
        (TaskId,TagId)
    SELECT @TaskId, t.TagId
    FROM Tags t
        INNER JOIN @Tags inputTag
        ON t.TagName = inputTag.TagName;   


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
