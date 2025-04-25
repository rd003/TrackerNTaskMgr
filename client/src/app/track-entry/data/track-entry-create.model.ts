export interface TrackEntryCreateModel {
    entryDate: string;         // ISO date: 'YYYY-MM-DD'
    sleptAt: string;           // ISO datetime: 'YYYY-MM-DDTHH:mm'
    wokeUpAt: string;          // ISO datetime: 'YYYY-MM-DDTHH:mm'
    napInMinutes: number|null;
    totalWorkInMinutes: number;
    remarks: string | null;
}

export interface TrackEntryUpdateModel extends TrackEntryCreateModel {
    trackEntryId: number
}
