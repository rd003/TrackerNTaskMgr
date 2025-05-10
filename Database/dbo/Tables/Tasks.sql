CREATE TABLE [dbo].[Tasks]
(
    [TaskId] INT IDENTITY (1, 1) NOT NULL,
    [TaskHeaderId] INT NOT NULL,
    [TaskTitle] NVARCHAR (50) NOT NULL,
    [TaskUri] VARCHAR (300) NULL,
    [TaskPriorityId] TINYINT NOT NULL,
    [TaskStatusId] TINYINT NOT NULL,
    [Deadline] DATETIME2 (7) NULL,
    [ScheduledAt] DATETIME2 (7) NULL,
    [Created] DATETIME2 (7) DEFAULT (getdate()) NOT NULL,
    [Updated] DATETIME2 (7) NULL,
    [Deleted] DATETIME2 (7) NULL,
    [DisplayAtBoard] bit default 0,
    CONSTRAINT [PK_Task_TaskId] PRIMARY KEY CLUSTERED ([TaskId] ASC),
    CONSTRAINT [FK_Task_TaskHeader_TaskHeaderId] FOREIGN KEY ([TaskHeaderId]) REFERENCES [dbo].[TaskHeaders] ([TaskHeaderId]),
    CONSTRAINT [FK_Tasks_TaskPriorities_TaskPriorityId] FOREIGN KEY ([TaskPriorityId]) REFERENCES [dbo].[TaskPriorities] ([TaskPriorityId]),
    CONSTRAINT [FK_Tasks_TaskStatuses_TaskStatusId] FOREIGN KEY ([TaskStatusId]) REFERENCES [dbo].[TaskStatuses] ([TaskStatusId])
);


GO
CREATE NONCLUSTERED INDEX [IX_TaskHeaderId]
    ON [dbo].[Tasks]([TaskHeaderId] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_TaskPriorityId]
    ON [dbo].[Tasks]([TaskPriorityId] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_TaskStatusId]
    ON [dbo].[Tasks]([TaskStatusId] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_TaskTitle]
    ON [dbo].[Tasks]([TaskTitle] ASC);

GO
