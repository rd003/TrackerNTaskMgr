export interface TrackEntryCreateModel {
    entryDate: Date;         // ISO date: 'YYYY-MM-DD'
    sleptAt: Date;           // ISO datetime: 'YYYY-MM-DDTHH:mm'
    wokeUpAt: Date;          // ISO datetime: 'YYYY-MM-DDTHH:mm'
    napInMinutes: number|null;
    totalWorkInMinutes: number;
    remarks: string | null;
}

export interface TrackEntryUpdateModel extends TrackEntryCreateModel {
    trackEntryId: number
}
