import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { TrackEntryReadModel } from "./track-entry-read.model";
import { Observable } from "rxjs";
import { TrackEntryCreateModel, TrackEntryUpdateModel } from "./track-entry-create.model";
import { formatDateToLocalISOString } from "../../shared/services/date.util";

@Injectable({
  providedIn: "root"
})

export class TrackEntryService {
  // what will happen If I don't put readonly here
  private readonly url = environment.baseUrl + "/trackentries";
  private readonly http = inject(HttpClient);

  getEntries(limit: number = 10, sortDirection: string = 'asc'): Observable<TrackEntryReadModel[]> {
    return this.http.get<TrackEntryReadModel[]>(this.url);
  }

  getEntry(id: number): Observable<TrackEntryReadModel> {
    return this.http.get<TrackEntryReadModel>(`${this.url}/${id}`);
  }

  createEntry(entryData: TrackEntryCreateModel): Observable<TrackEntryReadModel> {
    return this.http.post<TrackEntryReadModel>(this.url, this.formatSubmittedData(entryData));
  }

  updateEntry(entryData: TrackEntryUpdateModel): Observable<TrackEntryReadModel> {
    const formattedData = this.formatSubmittedData(entryData);
    return this.http.put<TrackEntryReadModel>(`${this.url}/${entryData.trackEntryId}`, formattedData);
  }

  deleteEntry(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  private formatSubmittedData(entryData: any) {
    return {
      trackEntryId: entryData.trackEntryId,
      entryDate: formatDateToLocalISOString(new Date(entryData.entryDate)).split('T')[0],
      sleptAt: formatDateToLocalISOString(new Date(entryData.sleptAt)),
      wokeUpAt: formatDateToLocalISOString(new Date(entryData.wokeUpAt)),
      napInMinutes: Number(entryData.napInMinutes),
      totalWorkInMinutes: Number(entryData.totalWorkInMinutes),
      remarks: entryData.remarks || null
    };
  }

}