import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { TrackEntryReadModel } from "./track-entry-read.model";
import { Observable } from "rxjs";
import { TrackEntryCreateModel, TrackEntryUpdateModel } from "./track-entry-create.model";

@Injectable({
 providedIn:"root"
})

export class TrackEntryService
{
   // what will happen If I don't put readonly here
   private readonly url = environment.baseUrl+"/trackentries";
   private readonly http = inject(HttpClient);

   getEntries(limit:number=10,sortDirection:string='asc') : Observable<TrackEntryReadModel[]>
   {
       return this.http.get<TrackEntryReadModel[]>(this.url);       
   }

   getEntry(id:number) : Observable<TrackEntryReadModel>
   {
    return this.http.get<TrackEntryReadModel>(`${this.url}/${id}`);
   }

   createEntry(entryData: TrackEntryCreateModel):Observable<TrackEntryReadModel>
   {
     const formattedData= {
      entryDate: entryData.entryDate.toISOString().split('T')[0], // Format as YYYY-MM-DD
      sleptAt: entryData.sleptAt.toISOString(),
      wokeUpAt: entryData.wokeUpAt.toISOString(),
      napInMinutes: Number(entryData.napInMinutes), // Ensure it's a number
      totalWorkInMinutes: Number(entryData.totalWorkInMinutes), // Ensure it's a number
      remarks: entryData.remarks || null
    };
     return this.http.post<TrackEntryReadModel>(this.url,formattedData);
   }

   updateEntry(entryData:TrackEntryUpdateModel) : Observable<void>
   {
    return this.http.put<void>(`${this.url}/${entryData.trackEntryId}`,entryData);
   }

   deleteEntry(id:number) : Observable<void>
   {
    return this.http.delete<void>(`${this.url}/${id}`);
   }
   
}