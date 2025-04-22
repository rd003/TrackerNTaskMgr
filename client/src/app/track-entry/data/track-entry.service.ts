import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.development";

@Injectable({
 providedIn:"root"
})

export class TrackEntryService
{
    // what will happen If I don't put readonly here
   private readonly url = environment.baseUrl+"/api"; 
}