export interface TrackEntryReadModel {
    trackEntryId: string,
    entryDate: Date,
    sleptAt: Date,
    wokeUpAt: Date,
    napInMinutes: number | null,
    totalSleepInMinutes: number,
    totalWorkInMinutes: number,
    Remarks: string | null
}

// export interface TrackEntryRemarkModel {
//     trackEntryId: string,
//     remarks: string
// }