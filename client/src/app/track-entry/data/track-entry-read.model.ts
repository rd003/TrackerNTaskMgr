export interface TrackEntryReadModel
{
    trackEntryId: number,
    entryDate : Date,
    sleptAt : Date,
    wokeUpAt : Date,
    napInMinutes: number|null,
    totalSleepInMinutes: number,
    totalWorkInMinutes:number,
    trackEntryRemark: string|null
}