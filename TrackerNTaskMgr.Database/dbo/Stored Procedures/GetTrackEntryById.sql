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