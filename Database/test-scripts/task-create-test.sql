DECLARE @TaskId INT;
DECLARE @TaskPriorityId TINYINT = 2;
DECLARE @TaskStatusId TINYINT = 1, @TestHeaderId TINYINT = 1;

DECLARE @TestSubTasks AS dbo.typSubTask;
DECLARE @TestTags AS dbo.typTags;

INSERT INTO @TestSubTasks
    (SubTaskTitle, SubTaskUri)
VALUES
    ('Subtask 2_1', 'http://example.com/subtask1'),
    ('Subtask 2_2', 'http://example.com/subtask2');

-- Prepare tags (mix of existing and new)
INSERT INTO @TestTags
    (TagName)
VALUES
    ('Programming'),
    ('csharp'),
    ('Dotnet');

EXEC CreateTask
        @TaskHeaderId = @TestHeaderId,
        @TaskTitle = 'Test Task 2',
        @TaskUri = 'http://example.com/task2',
        @TaskPriorityId = @TaskPriorityId,
        @TaskStatusId = @TaskStatusId,
        @Deadline = NULL,
        @ScheduledAt = NULL,
        @SubTasks = @TestSubTasks,
        @Tags = @TestTags,
        @TaskId = @TaskId OUTPUT;

SELECT @TaskId;

SELECT *
FROM Tasks;
SELECT *
FROM SubTasks;
SELECT *
FROM Tags;
SELECT *
FROM TaskTags;