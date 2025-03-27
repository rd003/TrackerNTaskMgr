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