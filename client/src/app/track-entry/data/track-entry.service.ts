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

   creatEntry(entryData: TrackEntryCreateModel):Observable<TrackEntryCreateModel>
   {
     return this.http.post<TrackEntryCreateModel>(this.url,entryData);
   }

   updateEntry(entryData:TrackEntryUpdateModel) : Observable<void>
   {
    return this.http.put<void>(`${this.url}/${entryData.id}`,entryData);
   }

   deleteEntry(id:number) : Observable<void>
   {
    return this.http.delete<void>(`${this.url}/${id}`);
   }
   
}