CREATE TABLE [dbo].[TrackEntries] (
    [TrackEntryId]        INT           IDENTITY (1, 1) NOT NULL,
    [EntryDate]           DATE          NOT NULL,
    [SleptAt]             DATETIME2 (7) NOT NULL,
    [WokeUpAt]            DATETIME2 (7) NOT NULL,
    [NapInMinutes]        SMALLINT      NULL,
    [TotalWorkInMinutes]  SMALLINT      NOT NULL,
    [Created]             DATETIME2 (7) DEFAULT (getdate()) NOT NULL,
    [Updated]             DATETIME2 (7) NULL,
    [TotalSleepInMinutes] AS            (datediff(minute,[SleptAt],[WokeUpAt])+isnull([NapInMinutes],(0))) PERSISTED,
    CONSTRAINT [PK_TrackEntry_TrackEntryId] PRIMARY KEY CLUSTERED ([TrackEntryId] ASC)
);


GO
CREATE UNIQUE NONCLUSTERED INDEX [UIX_EntryDate]
    ON [dbo].[TrackEntries]([EntryDate] ASC);

