CREATE TABLE [dbo].[TaskStatuses] (
    [TaskStatusId]    TINYINT       NOT NULL,
    [TaskStatusName]  NVARCHAR (30) NOT NULL,
    [TaskStatusEmoji] NVARCHAR (20) NULL,
    [Created]         DATETIME2 (7) DEFAULT (getdate()) NOT NULL,
    [Updated]         DATETIME2 (7) NULL,
    [Deleted]         DATETIME2 (7) NULL,
    CONSTRAINT [PK_TaskStatus_TaskStatusId] PRIMARY KEY CLUSTERED ([TaskStatusId] ASC)
);


GO
CREATE UNIQUE NONCLUSTERED INDEX [UQ_TaskStatusName]
    ON [dbo].[TaskStatuses]([TaskStatusName] ASC)
    INCLUDE([Deleted]) WHERE ([Deleted] IS NULL);

