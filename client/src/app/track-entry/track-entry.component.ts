import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { TrackEntryReadModel } from "./data/track-entry-read.model";
import { TrackEntryListComponent } from "./ui/track-entry-list.component";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { TrackEntryUpdateModel } from "./data/track-entry-create.model";
import { TrackEntryDialogComponent } from "./ui/track-entry-dialog.component";
import { Observable, Subject, takeUntil } from "rxjs";
import { MatButtonModule } from "@angular/material/button";
import { TrackEntryStore } from "./store/track-entry.store";
import { AsyncPipe } from "@angular/common";

@Component({
  selector: 'app-track-entry',
  standalone:true,
  imports: [TrackEntryListComponent, MatDialogModule,MatButtonModule,AsyncPipe],
  providers:[TrackEntryStore],
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
   <app-track-entry-list [dataSource]="(trackEntries$|async)??[]" (editTrackEntry)="onAddUpdate('Edit', $event)" (deleteTrackEntry)="onDelete($event)"/>
  `,
  styles:[],
  changeDetection: ChangeDetectionStrategy.OnPush, 
})

export class TrackEntryComponent
{
    dialog = inject(MatDialog);
    destroyed$ = new Subject<boolean>();
    store = inject(TrackEntryStore);
    trackEntries$:Observable<readonly TrackEntryReadModel[]> = this.store.entries$;
  
    onAddUpdate(action: string, trackEntry: TrackEntryReadModel | null = null) {
        let trackEntryUpdate:TrackEntryUpdateModel|null=null;
        if(trackEntry!=null)
        {
           trackEntryUpdate = {...trackEntry,remarks:trackEntry.trackEntryRemark?.remarks??""};
        }
        const dialogRef = this.dialog.open(TrackEntryDialogComponent, {
          data: { trackEntry:trackEntryUpdate, title: action + " TrackEntry" },
        });
    
        dialogRef.componentInstance.sumbit
          .pipe(takeUntil(this.destroyed$))
          .subscribe((submittedData) => {
            if (!submittedData) return;
            if (submittedData.trackEntryId) {
              // update book
            } else {
                // AddBook
            }
            dialogRef.componentInstance.form.reset();
            dialogRef.componentInstance.onCanceled();
          });
      }


   onDelete(trackEntryRead:TrackEntryReadModel){
     console.log(trackEntryRead);
   }
}