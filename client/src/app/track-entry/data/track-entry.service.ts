import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { HttpClient, HttpParams } from "@angular/common/http";
import { TrackEntryReadModel } from "./track-entry-read.model";
import { Observable } from "rxjs";
import { TrackEntryCreateModel, TrackEntryUpdateModel } from "./track-entry-create.model";
import { formatDateToLocalISOString } from "../../shared/services/date.util";
import { PageDirection } from "../../shared/page-direction";
import { SortDirection } from "@angular/material/sort";

@Injectable({
  providedIn: "root"
})

export class TrackEntryService {
  // what will happen If I don't put readonly here
  private readonly url = environment.baseUrl + "/trackentries";
  private readonly http = inject(HttpClient);

  getEntries(startDate: string | null, endDate: string | null, lastEntryDate: string | null, pageDirection: PageDirection = "NEXT", limit: number = 7, sortDirection: SortDirection = 'desc')
    : Observable<TrackEntryReadModel[]> {
    let params = new HttpParams();
    params = params.set("limit", limit);
    params = params.set("sortDirection", sortDirection);
    if (startDate && endDate) {
      params = params.set("startDate", startDate.split('T')[0]);
      params = params.set("endDate", endDate.split('T')[0]);
    }
    if (lastEntryDate) {
      params = params.set("lastEntryDate", lastEntryDate);
    }
    if (pageDirection) {
      params = params.set("pageDirection", pageDirection);
    }
    return this.http.get<TrackEntryReadModel[]>(this.url, { params: params });
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