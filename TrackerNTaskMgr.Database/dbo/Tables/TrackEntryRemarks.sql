CREATE TABLE [dbo].[TrackEntryRemarks] (
    [TrackEntryId] INT             NOT NULL,
    [Remarks]      NVARCHAR (1000) NOT NULL,
    CONSTRAINT [PK_TrackId] PRIMARY KEY CLUSTERED ([TrackEntryId] ASC),
    CONSTRAINT [FK_TrackRemarks_TrackEntries_TrackEntryId] FOREIGN KEY ([TrackEntryId]) REFERENCES [dbo].[TrackEntries] ([TrackEntryId])
);

