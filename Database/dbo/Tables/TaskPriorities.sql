CREATE TABLE [dbo].[TaskPriorities] (
    [TaskPriorityId]    TINYINT       NOT NULL,
    [TaskPriorityName]  NVARCHAR (15) NULL,
    [TaskPriorityOrder] TINYINT       NOT NULL,
    [TaskPriorityEmoji] NVARCHAR (20) NULL,
    [Created]           DATETIME2 (7) DEFAULT (getdate()) NOT NULL,
    [Updated]           DATETIME2 (7) NULL,
    [Deleted]           DATETIME2 (7) NULL,
    CONSTRAINT [PK_TaskPriority_TaskPriorityId] PRIMARY KEY CLUSTERED ([TaskPriorityId] ASC)
);


GO
CREATE UNIQUE NONCLUSTERED INDEX [UQ_TaskPriorityName]
    ON [dbo].[TaskPriorities]([TaskPriorityName] ASC)
    INCLUDE([Deleted]) WHERE ([Deleted] IS NULL);

