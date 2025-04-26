import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { TrackEntryReadModel } from "./data/track-entry-read.model";
import { TrackEntryListComponent } from "./ui/track-entry-list.component";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { TrackEntryUpdateModel } from "./data/track-entry-create.model";
import { TrackEntryDialogComponent } from "./ui/track-entry-dialog.component";
import { Subject, takeUntil } from "rxjs";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: 'app-track-entry',
  standalone:true,
  imports: [TrackEntryListComponent, MatDialogModule,MatButtonModule],
  template:`
  <h1>Track Entries</h1>
  <p>
      <button
        type="button"
        (click)="onAddUpdate('Add', null)"
        mat-raised-button
        color="accent"
      >
        +
      </button>
  </p>
   <app-track-entry-list [dataSource]="trackEntries" (editTrackEntry)="onAddUpdate('Edit', $event)" (deleteTrackEntry)="onDelete($event)"/>
  `,
  styles:[],
  changeDetection: ChangeDetectionStrategy.OnPush, 
})

export class TrackEntryComponent
{
    dialog = inject(MatDialog);
    destroyed$ = new Subject<boolean>();
    
    trackEntries:TrackEntryReadModel[] = [
        {
            trackEntryId:1,
            totalSleepInMinutes:480,
            totalWorkInMinutes:300,
            napInMinutes:null,
            entryDate:new Date("2025-04-12"),
            sleptAt:new Date("2025-04-11T23:00"),
            wokeUpAt:new Date("2025-04-12T08:00"),
            trackEntryRemark:null,
        },
        {
            trackEntryId:2,
            totalSleepInMinutes:420,
            totalWorkInMinutes:360,
            napInMinutes:null,
            entryDate:new Date("2025-04-13"),
            sleptAt:new Date("2025-04-12T22:39"),
            wokeUpAt:new Date("2025-04-13T08:00"),
            trackEntryRemark:"something",
        }
    ];

    onAddUpdate(action: string, trackEntry: TrackEntryUpdateModel | null = null) {
        const dialogRef = this.dialog.open(TrackEntryDialogComponent, {
          data: { trackEntry, title: action + " TrackEntry" },
        });
    
        dialogRef.componentInstance.sumbit
          .pipe(takeUntil(this.destroyed$))
          .subscribe((submittedData) => {
            console.log(submittedData);
            if (!submittedData) return;
            if (submittedData.trackEntryId) {
              // update book
            } else {
                // AddBook
            }
            // TODO: lines below only executed, when we have added books successfully
            dialogRef.componentInstance.form.reset();
            dialogRef.componentInstance.onCanceled();
          });
      }


   onDelete(trackEntryRead:TrackEntryReadModel){
     console.log(trackEntryRead);
   }
}