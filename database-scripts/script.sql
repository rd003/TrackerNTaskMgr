USE [master]
GO
/****** Object:  Database [TrackerNTaskMgt]    Script Date: 26-03-2025 18:12:13 ******/
CREATE DATABASE [TrackerNTaskMgt]
GO

USE [TrackerNTaskMgt]
GO

/****** Object:  Table [dbo].[SubTasks]    Script Date: 26-03-2025 18:12:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SubTasks](
	[SubTaskId] [int] IDENTITY(1,1) NOT NULL,
	[TaskId] [int] NOT NULL,
	[SubTaskTitle] [nvarchar](50) NOT NULL,
	[SubTaskUri] [varchar](300) NULL,
	[Created] [datetime2](7) NOT NULL,
	[Updated] [datetime2](7) NULL,
	[Deleted] [datetime2](7) NULL,
 CONSTRAINT [PK_SubTask_SubTaskId] PRIMARY KEY CLUSTERED 
(
	[SubTaskId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Tags]    Script Date: 26-03-2025 18:12:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tags](
	[TagId] [int] IDENTITY(1,1) NOT NULL,
	[TagName] [nvarchar](20) NOT NULL,
	[Created] [datetime2](7) NOT NULL,
	[Updated] [datetime2](7) NULL,
	[Deleted] [datetime2](7) NULL,
 CONSTRAINT [PK_Tags_TagId] PRIMARY KEY CLUSTERED 
(
	[TagId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[TagName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[TaskHeaders]    Script Date: 26-03-2025 18:12:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TaskHeaders](
	[TaskHeaderId] [int] IDENTITY(1,1) NOT NULL,
	[TaskHeaderTitle] [nvarchar](30) NOT NULL,
	[Created] [datetime2](7) NOT NULL,
	[Updated] [datetime2](7) NULL,
	[Deleted] [datetime2](7) NULL,
 CONSTRAINT [PK_TaskHeader_TaskHeaderId] PRIMARY KEY CLUSTERED 
(
	[TaskHeaderId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[TaskPriorities]    Script Date: 26-03-2025 18:12:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TaskPriorities](
	[TaskPriorityId] [tinyint] NOT NULL,
	[TaskPriorityName] [nvarchar](15) NULL,
	[TaskPriorityOrder] [tinyint] NOT NULL,
	[TaskPriorityEmoji] [nvarchar](20) NULL,
	[Created] [datetime2](7) NOT NULL,
	[Updated] [datetime2](7) NULL,
	[Deleted] [datetime2](7) NULL,
 CONSTRAINT [PK_TaskPriority_TaskPriorityId] PRIMARY KEY CLUSTERED 
(
	[TaskPriorityId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Tasks]    Script Date: 26-03-2025 18:12:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tasks](
	[TaskId] [int] IDENTITY(1,1) NOT NULL,
	[TaskHeaderId] [int] NOT NULL,
	[TaskTitle] [nvarchar](50) NOT NULL,
	[TaskUri] [varchar](300) NULL,
	[TaskPriorityId] [tinyint] NOT NULL,
	[TaskStatusId] [tinyint] NOT NULL,
	[Deadline] [datetime2](7) NULL,
	[ScheduledAt] [datetime2](7) NULL,
	[Created] [datetime2](7) NOT NULL,
	[Updated] [datetime2](7) NULL,
	[Deleted] [datetime2](7) NULL,
 CONSTRAINT [PK_Task_TaskId] PRIMARY KEY CLUSTERED 
(
	[TaskId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[TaskStatuses]    Script Date: 26-03-2025 18:12:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TaskStatuses](
	[TaskStatusId] [tinyint] NOT NULL,
	[TaskStatusName] [nvarchar](30) NOT NULL,
	[TaskStatusEmoji] [nvarchar](20) NULL,
	[Created] [datetime2](7) NOT NULL,
	[Updated] [datetime2](7) NULL,
	[Deleted] [datetime2](7) NULL,
 CONSTRAINT [PK_TaskStatus_TaskStatusId] PRIMARY KEY CLUSTERED 
(
	[TaskStatusId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[TaskTags]    Script Date: 26-03-2025 18:12:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TaskTags](
	[TaskId] [int] NOT NULL,
	[TagId] [int] NOT NULL,
	[Created] [datetime2](7) NOT NULL,
	[Updated] [datetime2](7) NULL,
	[Deleted] [datetime2](7) NULL,
 CONSTRAINT [PK_TaskTag_TaskId_TagId] PRIMARY KEY CLUSTERED 
(
	[TaskId] ASC,
	[TagId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[TrackEntries]    Script Date: 26-03-2025 18:12:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TrackEntries](
	[TrackEntryId] [int] IDENTITY(1,1) NOT NULL,
	[EntryDate] [date] NOT NULL,
	[SleptAt] [datetime2](7) NOT NULL,
	[WokeUpAt] [datetime2](7) NOT NULL,
	[NapInMinutes] [smallint] NULL,
	[TotalWorkInMinutes] [smallint] NOT NULL,
	[Created] [datetime2](7) NOT NULL,
	[Updated] [datetime2](7) NULL,
	[TotalSleepInMinutes]  AS (datediff(minute,[SleptAt],[WokeUpAt])+isnull([NapInMinutes],(0))) PERSISTED,
 CONSTRAINT [PK_TrackEntry_TrackEntryId] PRIMARY KEY CLUSTERED 
(
	[TrackEntryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[TrackEntryRemarks]    Script Date: 26-03-2025 18:12:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TrackEntryRemarks](
	[TrackEntryId] [int] NOT NULL,
	[Remarks] [nvarchar](1000) NOT NULL,
 CONSTRAINT [PK_TrackId] PRIMARY KEY CLUSTERED 
(
	[TrackEntryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[UserAccounts]    Script Date: 26-03-2025 18:12:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserAccounts](
	[UserAccountId] [int] IDENTITY(1,1) NOT NULL,
	[Username] [nvarchar](20) NULL,
	[PasswordHash] [nvarchar](150) NOT NULL,
 CONSTRAINT [PK_UserAccount_UserAccountId] PRIMARY KEY CLUSTERED 
(
	[UserAccountId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Index [IX_TaskId]    Script Date: 26-03-2025 18:12:13 ******/
CREATE NONCLUSTERED INDEX [IX_TaskId] ON [dbo].[SubTasks]
(
	[TaskId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO

/****** Object:  Index [IX_TaskHeaderTitle]    Script Date: 26-03-2025 18:12:13 ******/
CREATE NONCLUSTERED INDEX [IX_TaskHeaderTitle] ON [dbo].[TaskHeaders]
(
	[TaskHeaderTitle] ASC
)
INCLUDE([Deleted]) 
WHERE ([Deleted] IS NULL)
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO

/****** Object:  Index [UQ_TaskPriorityName]    Script Date: 26-03-2025 18:12:13 ******/
CREATE UNIQUE NONCLUSTERED INDEX [UQ_TaskPriorityName] ON [dbo].[TaskPriorities]
(
	[TaskPriorityName] ASC
)
INCLUDE([Deleted]) 
WHERE ([Deleted] IS NULL)
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO

/****** Object:  Index [IX_TaskHeaderId]    Script Date: 26-03-2025 18:12:13 ******/
CREATE NONCLUSTERED INDEX [IX_TaskHeaderId] ON [dbo].[Tasks]
(
	[TaskHeaderId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO

/****** Object:  Index [IX_TaskPriorityId]    Script Date: 26-03-2025 18:12:13 ******/
CREATE NONCLUSTERED INDEX [IX_TaskPriorityId] ON [dbo].[Tasks]
(
	[TaskPriorityId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO

/****** Object:  Index [IX_TaskStatusId]    Script Date: 26-03-2025 18:12:13 ******/
CREATE NONCLUSTERED INDEX [IX_TaskStatusId] ON [dbo].[Tasks]
(
	[TaskStatusId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO

/****** Object:  Index [IX_TaskTitle]    Script Date: 26-03-2025 18:12:13 ******/
CREATE NONCLUSTERED INDEX [IX_TaskTitle] ON [dbo].[Tasks]
(
	[TaskTitle] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO

/****** Object:  Index [UQ_TaskStatusName]    Script Date: 26-03-2025 18:12:13 ******/
CREATE UNIQUE NONCLUSTERED INDEX [UQ_TaskStatusName] ON [dbo].[TaskStatuses]
(
	[TaskStatusName] ASC
)
INCLUDE([Deleted]) 
WHERE ([Deleted] IS NULL)
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO

/****** Object:  Index [IX_TagId]    Script Date: 26-03-2025 18:12:13 ******/
CREATE NONCLUSTERED INDEX [IX_TagId] ON [dbo].[TaskTags]
(
	[TagId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO

/****** Object:  Index [IX_TaskId]    Script Date: 26-03-2025 18:12:13 ******/
CREATE NONCLUSTERED INDEX [IX_TaskId] ON [dbo].[TaskTags]
(
	[TaskId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO

/****** Object:  Index [UIX_EntryDate]    Script Date: 26-03-2025 18:12:13 ******/
CREATE UNIQUE NONCLUSTERED INDEX [UIX_EntryDate] ON [dbo].[TrackEntries]
(
	[EntryDate] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[SubTasks] ADD  DEFAULT (getdate()) FOR [Created]
GO
ALTER TABLE [dbo].[Tags] ADD  DEFAULT (getdate()) FOR [Created]
GO
ALTER TABLE [dbo].[TaskHeaders] ADD  DEFAULT (getdate()) FOR [Created]
GO
ALTER TABLE [dbo].[TaskPriorities] ADD  DEFAULT (getdate()) FOR [Created]
GO
ALTER TABLE [dbo].[Tasks] ADD  DEFAULT (getdate()) FOR [Created]
GO
ALTER TABLE [dbo].[TaskStatuses] ADD  DEFAULT (getdate()) FOR [Created]
GO
ALTER TABLE [dbo].[TaskTags] ADD  DEFAULT (getdate()) FOR [Created]
GO
ALTER TABLE [dbo].[TrackEntries] ADD  DEFAULT (getdate()) FOR [Created]
GO
ALTER TABLE [dbo].[SubTasks]  WITH CHECK ADD  CONSTRAINT [FK_Tasks_Subtasks_TaskId] FOREIGN KEY([TaskId])
REFERENCES [dbo].[Tasks] ([TaskId])
GO
ALTER TABLE [dbo].[SubTasks] CHECK CONSTRAINT [FK_Tasks_Subtasks_TaskId]
GO
ALTER TABLE [dbo].[Tasks]  WITH CHECK ADD  CONSTRAINT [FK_Task_TaskHeader_TaskHeaderId] FOREIGN KEY([TaskHeaderId])
REFERENCES [dbo].[TaskHeaders] ([TaskHeaderId])
GO
ALTER TABLE [dbo].[Tasks] CHECK CONSTRAINT [FK_Task_TaskHeader_TaskHeaderId]
GO
ALTER TABLE [dbo].[Tasks]  WITH CHECK ADD  CONSTRAINT [FK_Tasks_TaskPriorities_TaskPriorityId] FOREIGN KEY([TaskPriorityId])
REFERENCES [dbo].[TaskPriorities] ([TaskPriorityId])
GO
ALTER TABLE [dbo].[Tasks] CHECK CONSTRAINT [FK_Tasks_TaskPriorities_TaskPriorityId]
GO
ALTER TABLE [dbo].[Tasks]  WITH CHECK ADD  CONSTRAINT [FK_Tasks_TaskStatuses_TaskStatusId] FOREIGN KEY([TaskStatusId])
REFERENCES [dbo].[TaskStatuses] ([TaskStatusId])
GO
ALTER TABLE [dbo].[Tasks] CHECK CONSTRAINT [FK_Tasks_TaskStatuses_TaskStatusId]
GO
ALTER TABLE [dbo].[TaskTags]  WITH CHECK ADD  CONSTRAINT [FK_TaskTags_Tags_TagId] FOREIGN KEY([TagId])
REFERENCES [dbo].[Tags] ([TagId])
GO
ALTER TABLE [dbo].[TaskTags] CHECK CONSTRAINT [FK_TaskTags_Tags_TagId]
GO
ALTER TABLE [dbo].[TaskTags]  WITH CHECK ADD  CONSTRAINT [FK_TaskTags_Tasks_TaskId] FOREIGN KEY([TaskId])
REFERENCES [dbo].[Tasks] ([TaskId])
GO
ALTER TABLE [dbo].[TaskTags] CHECK CONSTRAINT [FK_TaskTags_Tasks_TaskId]
GO
ALTER TABLE [dbo].[TrackEntryRemarks]  WITH CHECK ADD  CONSTRAINT [FK_TrackRemarks_TrackEntries_TrackEntryId] FOREIGN KEY([TrackEntryId])
REFERENCES [dbo].[TrackEntries] ([TrackEntryId])
GO
ALTER TABLE [dbo].[TrackEntryRemarks] CHECK CONSTRAINT [FK_TrackRemarks_TrackEntries_TrackEntryId]
GO

/****** Object:  StoredProcedure [dbo].[CreateTrackEntry]    Script Date: 26-03-2025 18:12:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[CreateTrackEntry]
  @EntryDate DATE,
  @SleptAt DATETIME2,
  @WokeUpAt DATETIME2,
  @NapInMinutes SMALLINT,
  @TotalWorkInMinutes SMALLINT,
  @Remarks NVARCHAR(1000) = NULL,
  @TrackEntryId INT OUTPUT
AS
BEGIN
  SET NOCOUNT ON;
  BEGIN TRY
    BEGIN TRANSACTION;
	INSERT INTO TrackEntries(
	   EntryDate,
       SleptAt,
       WokeUpAt,
       NapInMinutes,
       TotalWorkInMinutes
    )
	VALUES (
       @EntryDate,
       @SleptAt,
       @WokeUpAt,
       @NapInMinutes,
       @TotalWorkInMinutes
   );
  SET @TrackEntryId= SCOPE_IDENTITY();

  -- Insert remarks if provided

  IF @Remarks IS NOT NULL AND LEN(TRIM(@Remarks)) > 0
  BEGIN
    INSERT INTO TrackEntryRemarks (TrackEntryId,Remarks)
    VALUES (@TrackEntryId,@Remarks);
  END

  COMMIT TRANSACTION;
  
  END TRY

  BEGIN CATCH
    IF (XACT_STATE()=-1)
	   ROLLBACK TRANSACTION;
    -- rethrowing error
	THROW;
  END CATCH

END

GO

/****** Object:  StoredProcedure [dbo].[DeleteTrackEntry]    Script Date: 26-03-2025 18:12:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[DeleteTrackEntry]
	@TrackEntryId int
AS
BEGIN
   BEGIN TRY
     SET NOCOUNT ON;
	 
	 BEGIN TRANSACTION;

	 DELETE FROM TrackEntryRemarks WHERE TrackEntryId=@TrackEntryId; 
	 DELETE FROM TrackEntries WHERE TrackEntryId=@TrackEntryId; 

	 COMMIT TRANSACTION;
   END TRY

   BEGIN CATCH
      IF XACT_STATE()=-1
	     ROLLBACK TRANSACTION;
      THROW;
   END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[GetTrackEntries]    Script Date: 26-03-2025 18:12:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE    procedure [dbo].[GetTrackEntries]
  @StartDate date null=null,
  @EndDate date null=null,
  @Limit int = 10,
  @LastEntryDate date null=null,
  @SortDirection varchar(4) = 'DESC'
as
begin
  set nocount on;

  if (UPPER(@SortDirection) NOT IN ('ASC','DESC'))
     throw 50000,'SortDirection can only be ''asc'' or ''desc''',1;

  declare @sql nvarchar(max);

  set @sql= 'select top (@Limit) 
               te.TrackEntryId,
               te.EntryDate,
               te.SleptAt,
               te.WokeUpAt,
               te.NapInMinutes,
               te.TotalSleepInMinutes,
               te.TotalWorkInMinutes,
               tr.TrackEntryId,
               tr.Remarks
             from TrackEntries te
             left join TrackEntryRemarks tr
             on te.TrackEntryId = tr.TrackEntryId
             where 1=1';

  -- filtering
  
  if (@StartDate is not null and @EndDate is null)
     set @sql +=' and EntryDate = @StartDate'; 
  
  if (@StartDate is not null and @EndDate is not null)
     set @sql +=' and EntryDate between @StartDate and @EndDate'; 
  
  --  sorting and pagination
  if (@LastEntryDate is null)
  begin
    set @sql += ' order by te.EntryDate';
    if (upper(@SortDirection))='DESC'
       set @sql += ' DESC';
  end

  else
  begin
      if (upper(@SortDirection))='ASC'
         set @sql += ' and te.EntryDate>@LastEntryDate order by te.EntryDate';
  
      else if (upper(@SortDirection))='DESC'
         set @sql += ' and te.EntryDate<@LastEntryDate order by te.EntryDate desc';
  end
  execute sp_executesql @sql, N'@StartDate date,@EndDate date,@Limit int,@LastEntryDate date,@SortDirection varchar(4)', @StartDate,@EndDate,@Limit,@LastEntryDate,@SortDirection
end
GO
/****** Object:  StoredProcedure [dbo].[GetTrackEntryById]    Script Date: 26-03-2025 18:12:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[GetTrackEntryById]
  @TrackEntryId int
As
Begin
  select  
    te.TrackEntryId,
    te.EntryDate,
    te.SleptAt,
    te.WokeUpAt,
    te.NapInMinutes,
    te.TotalSleepInMinutes,
    te.TotalWorkInMinutes,
    tr.TrackEntryId,
    tr.Remarks
  from TrackEntries te
  left join TrackEntryRemarks tr
  on te.TrackEntryId = tr.TrackEntryId
  where te.TrackEntryId=@TrackEntryId
  order by te.EntryDate desc
end
GO
/****** Object:  StoredProcedure [dbo].[UpdateTrackEntry]    Script Date: 26-03-2025 18:12:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   procedure [dbo].[UpdateTrackEntry]
  @TrackEntryId INT,
  @EntryDate DATE,
  @SleptAt DATETIME2,
  @WokeUpAt DATETIME2,
  @NapInMinutes SMALLINT,
  @TotalWorkInMinutes SMALLINT,
  @Remarks NVARCHAR(1000) = NULL
as
begin
  set nocount on;
  begin try
   -- updating track entry
    Update TrackEntries set 
       EntryDate=@EntryDate,
       SleptAt=@SleptAt,
       WokeUpAt=@WokeUpAt,
       NapInMinutes=@NapInMinutes,
       TotalWorkInMinutes=@TotalWorkInMinutes,
       Updated=getdate()
       where TrackEntryId=@TrackEntryId

   -- updating track remarks
   if exists (select 1 from TrackEntryRemarks where TrackEntryId=@TrackEntryId)
   begin
     IF @Remarks IS NOT NULL AND LEN(TRIM(@Remarks)) > 0
     BEGIN
       -- Update existing record with new remarks
       Update TrackEntryRemarks 
       set Remarks=@Remarks 
       where TrackEntryId=@TrackEntryId
     END

     if @Remarks is null
     begin
       delete from TrackEntryRemarks
       where TrackEntryId=@TrackEntryId
     end
   end
   ELSE IF @Remarks IS NOT NULL AND LEN(TRIM(@Remarks)) > 0
   BEGIN
     -- Optional: Insert new record if it doesn't exist and remarks are provided
     -- (Include this only if you need to handle record creation too)
     INSERT INTO TrackEntryRemarks (TrackEntryId, Remarks)
     VALUES (@TrackEntryId, @Remarks)
   END

   COMMIT TRANSACTION;
  END TRY

  begin catch
    if (XACT_STATE()=-1)
	   ROLLBACK TRANSACTION;
    throw;
  end catch
end
GO
USE [master]
GO
ALTER DATABASE [TrackerNTaskMgt] SET  READ_WRITE 
GO
