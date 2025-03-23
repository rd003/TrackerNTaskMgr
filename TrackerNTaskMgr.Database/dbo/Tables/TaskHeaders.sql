CREATE TABLE [dbo].[TaskHeaders] (
    [TaskHeaderId]    INT           IDENTITY (1, 1) NOT NULL,
    [TaskHeaderTitle] NVARCHAR (30) NOT NULL,
    [Created]         DATETIME2 (7) DEFAULT (getdate()) NOT NULL,
    [Updated]         DATETIME2 (7) NULL,
    [Deleted]         DATETIME2 (7) NULL,
    CONSTRAINT [PK_TaskHeader_TaskHeaderId] PRIMARY KEY CLUSTERED ([TaskHeaderId] ASC)
);


GO
CREATE NONCLUSTERED INDEX [IX_TaskHeaderTitle]
    ON [dbo].[TaskHeaders]([TaskHeaderTitle] ASC)
    INCLUDE([Deleted]) WHERE ([Deleted] IS NULL);

