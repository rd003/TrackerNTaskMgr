CREATE TABLE [dbo].[TaskTags] (
    [TaskId]  INT           NOT NULL,
    [TagId]   INT           NOT NULL,
    [Created] DATETIME2 (7) DEFAULT (getdate()) NOT NULL,
    [Updated] DATETIME2 (7) NULL,
    [Deleted] DATETIME2 (7) NULL,
    CONSTRAINT [PK_TaskTag_TaskId_TagId] PRIMARY KEY CLUSTERED ([TaskId] ASC, [TagId] ASC),
    CONSTRAINT [FK_TaskTags_Tags_TagId] FOREIGN KEY ([TagId]) REFERENCES [dbo].[Tags] ([TagId]),
    CONSTRAINT [FK_TaskTags_Tasks_TaskId] FOREIGN KEY ([TaskId]) REFERENCES [dbo].[Tasks] ([TaskId])
);


GO
CREATE NONCLUSTERED INDEX [IX_TaskId]
    ON [dbo].[TaskTags]([TaskId] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_TagId]
    ON [dbo].[TaskTags]([TagId] ASC);

