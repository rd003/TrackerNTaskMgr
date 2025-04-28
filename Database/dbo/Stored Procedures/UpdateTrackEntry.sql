CREATE OR ALTER  PROCEDURE [dbo].[UpdateTrackEntry]
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
