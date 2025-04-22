export interface TrackEntryReadModel
{
    trackEntryId: number,
    entryDate : string,
    sleptAt : string,
    wokeUpAt : string,
    napInMinutes: number|null,
    totalSleepInMinutes: number,
    totalWorkInMinutes:number,
    trackEntryRemark: string|null
}