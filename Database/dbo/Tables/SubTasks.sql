CREATE TABLE [dbo].[SubTasks] (
    [SubTaskId]    INT           IDENTITY (1, 1) NOT NULL,
    [TaskId]       INT           NOT NULL,
    [SubTaskTitle] NVARCHAR (50) NOT NULL,
    [SubTaskUri]   VARCHAR (300) NULL,
    [Created]      DATETIME2 (7) DEFAULT (getdate()) NOT NULL,
    [Updated]      DATETIME2 (7) NULL,
    [Deleted]      DATETIME2 (7) NULL,
    CONSTRAINT [PK_SubTask_SubTaskId] PRIMARY KEY CLUSTERED ([SubTaskId] ASC),
    CONSTRAINT [FK_Tasks_Subtasks_TaskId] FOREIGN KEY ([TaskId]) REFERENCES [dbo].[Tasks] ([TaskId])
);


GO
CREATE NONCLUSTERED INDEX [IX_TaskId]
    ON [dbo].[SubTasks]([TaskId] ASC);

