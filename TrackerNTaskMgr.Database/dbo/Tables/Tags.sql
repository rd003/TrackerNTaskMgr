CREATE TABLE [dbo].[Tags] (
    [TagId]   INT           IDENTITY (1, 1) NOT NULL,
    [TagName] NVARCHAR (20) NOT NULL,
    [Created] DATETIME2 (7) DEFAULT (getdate()) NOT NULL,
    [Updated] DATETIME2 (7) NULL,
    [Deleted] DATETIME2 (7) NULL,
    CONSTRAINT [PK_Tags_TagId] PRIMARY KEY CLUSTERED ([TagId] ASC),
    UNIQUE NONCLUSTERED ([TagName] ASC)
);

