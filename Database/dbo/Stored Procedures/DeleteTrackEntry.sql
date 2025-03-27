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
