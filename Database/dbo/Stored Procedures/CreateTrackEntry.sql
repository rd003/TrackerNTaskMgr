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

