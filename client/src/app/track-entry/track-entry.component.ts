import { Component } from "@angular/core";
import { TrackEntryReadModel } from "./data/track-entry-read.model";
import { TrackEntryListComponent } from "./ui/track-entry-list.component";

@Component({
  selector: 'app-track-entry',
  standalone:true,
  imports: [TrackEntryListComponent],
  template:`
   <app-track-entry-list [dataSource]="trackEntries" (editTrackEntry)="onEdit($event)" (deleteTrackEntry)="onDelete($event)"/>
  `,
  styles:[] 
})

export class TrackEntryComponent
{
    trackEntries:TrackEntryReadModel[] = [
        {
            trackEntryId:1,
            totalSleepInMinutes:480,
            totalWorkInMinutes:300,
            napInMinutes:null,
            entryDate:"2025-04-12",
            sleptAt:"2025-04-11T23:00",
            wokeUpAt:"2025-04-12T08:00",
            trackEntryRemark:null,
        },
        {
            trackEntryId:2,
            totalSleepInMinutes:420,
            totalWorkInMinutes:360,
            napInMinutes:null,
            entryDate:"2025-04-13",
            sleptAt:"2025-04-12T22:39",
            wokeUpAt:"2025-04-13T08:00",
            trackEntryRemark:"something",
        }
    ];

   onEdit(trackEntryRead:TrackEntryReadModel){
       console.log(trackEntryRead);
   } 

   onDelete(trackEntryRead:TrackEntryReadModel){
     console.log(trackEntryRead);
   }
}