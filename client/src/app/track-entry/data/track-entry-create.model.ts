export interface TrackEntryCreateModel {
    entryDate: Date;
    sleptAt: Date;
    wokeUpAt: Date;
    napInMinutes: number | null;
    totalWorkInMinutes: number;
    remarks: string | null;
}

export interface TrackEntryUpdateModel extends TrackEntryCreateModel {
    trackEntryId: string
}
