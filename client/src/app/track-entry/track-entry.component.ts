import { ChangeDetectionStrategy, Component, inject, OnDestroy } from "@angular/core";
import { TrackEntryReadModel } from "./data/track-entry-read.model";
import { TrackEntryListComponent } from "./ui/track-entry-list.component";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { TrackEntryUpdateModel } from "./data/track-entry-create.model";
import { TrackEntryDialogComponent } from "./ui/track-entry-dialog.component";
import { catchError, map, of, Subject, takeUntil, tap } from "rxjs";
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

   <div class="paginator" style="display:flex;gap:5px;margin:15px 0px">
   <button (click)="onPaginate(false)">Previous</button>
   <button (click)="onPaginate()">Next</button>
   </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TrackEntryComponent implements OnDestroy {
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

  onPaginate(next: boolean = true) {
    // logic: 1. sort entries by lastEntryDate asc(for next) or desc(for prev) order
    // 2. Take first element
    // 3. pass this entry to track entry store to update the lastEntryDate
    this.store.entries$.pipe(
      map(entries => {
        const sortableEntries = [...entries];
        return sortableEntries.sort((a, b) => {
          const dateA = new Date(a.entryDate);
          const dateB = new Date(b.entryDate);
          return next ? dateA.getTime() - dateB.getTime()
            : dateB.getTime() - dateA.getTime();
        });
      }),
      tap((entries) => {
        if (entries.length <= 0) return;
        console.log(entries[0].entryDate);
      }),
      catchError((error) => {
        console.log(error);
        return of(error);
      }),
      takeUntil(this.destroyed$)
    ).subscribe();
  }

  onSort(sortDirection: SortDirection) {
    this.store.setSortDirection(sortDirection);
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.unsubscribe();
  }

}