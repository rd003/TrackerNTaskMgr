import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { TrackEntryReadModel } from "./data/track-entry-read.model";
import { TrackEntryListComponent } from "./ui/track-entry-list.component";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { TrackEntryUpdateModel } from "./data/track-entry-create.model";
import { TrackEntryDialogComponent } from "./ui/track-entry-dialog.component";
import { Subject, takeUntil } from "rxjs";
import { MatButtonModule } from "@angular/material/button";
import { TrackEntryStore } from "./store/track-entry.store";
import { AsyncPipe, NgIf } from "@angular/common";
import { SortDirection } from "@angular/material/sort";

@Component({
  selector: 'app-track-entry',
  standalone: true,
  imports: [TrackEntryListComponent, MatDialogModule, MatButtonModule, AsyncPipe, NgIf],
  providers: [TrackEntryStore],
  template: `
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
   <div *ngIf="store.loading$ | async as loading"> loading... </div>

   <div *ngIf="store.error$|async as error" style="color:red">
      Something went wrong    
   </div>

   <app-track-entry-list [dataSource]="(store.entries$|async)??[]" (editTrackEntry)= "onAddUpdate('Edit', $event)" (deleteTrackEntry)="onDelete($event)" (sort)="onSort($event)"/>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TrackEntryComponent {
  dialog = inject(MatDialog);
  destroyed$ = new Subject<boolean>();
  store = inject(TrackEntryStore);

  onAddUpdate(action: string, trackEntry: TrackEntryReadModel | null = null) {
    let trackEntryUpdate: TrackEntryUpdateModel | null = null;
    if (trackEntry != null) {
      trackEntryUpdate = { ...trackEntry, remarks: trackEntry.trackEntryRemark?.remarks ?? "" };
    }
    const dialogRef = this.dialog.open(TrackEntryDialogComponent, {
      data: { trackEntry: trackEntryUpdate, title: action + " TrackEntry" },
    });

    dialogRef.componentInstance.sumbit
      .pipe(takeUntil(this.destroyed$))
      .subscribe((submittedData) => {
        if (!submittedData) return;

        if (submittedData.trackEntryId) {
          // update book
          this.store.updateEntry(submittedData);
        } else {
          // AddBook
          this.store.addEntry(submittedData);
        }
        dialogRef.componentInstance.form.reset();
        dialogRef.componentInstance.onCanceled();
      });
  }


  onDelete(trackEntryRead: TrackEntryReadModel) {
    if (window.confirm(`Are you sure to delete the record for: ${trackEntryRead.entryDate}?`)) {
      this.store.deleteTrackEntry(trackEntryRead.trackEntryId);
    }
  }

  onSort(sortDirection: SortDirection) {
    this.store.setSortDirection(sortDirection);
  }

  constructor() {
    this.store.error$.subscribe({
      next: console.log,
      error: console.log
    })
  }
}