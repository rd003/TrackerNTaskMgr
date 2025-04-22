export interface TrackEntryCreateModel {
    entryDate: string;         // ISO date: 'YYYY-MM-DD'
    sleptAt: string;           // ISO datetime: 'YYYY-MM-DDTHH:mm'
    wokeUpAt: string;          // ISO datetime: 'YYYY-MM-DDTHH:mm'
    napInMinutes: number;
    totalWorkInMinutes: number;
    remarks: string | null;
}
