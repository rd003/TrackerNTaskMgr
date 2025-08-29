import { ChangeDetectionStrategy, Component, inject, OnDestroy } from "@angular/core";
import { TrackEntryReadModel } from "./data/track-entry-read.model";
import { TrackEntryListComponent } from "./ui/track-entry-list.component";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { TrackEntryUpdateModel } from "./data/track-entry-create.model";
import { TrackEntryDialogComponent } from "./ui/track-entry-dialog.component";
import { catchError, combineLatest, distinctUntilChanged, map, of, Subject, switchMap, take, takeUntil, tap } from "rxjs";
import { MatButtonModule } from "@angular/material/button";
import { TrackEntryStore } from "./store/track-entry.store";
import { AsyncPipe } from "@angular/common";
import { SortDirection } from "@angular/material/sort";
import { formatDateToLocalISOString } from "../shared/services/date.util";
import { PageDirection } from "../shared/page-direction";
import { TrackEntryFilterComponent } from "./ui/track-entry-filter.component";
import { MatIconModule } from "@angular/material/icon";
import { minutesToHoursMinutes } from "../shared/timeFormatter";

@Component({
  selector: 'app-track-entry',
  standalone: true,
  imports: [TrackEntryListComponent, MatDialogModule, MatButtonModule, AsyncPipe, TrackEntryFilterComponent, MatIconModule],
  providers: [TrackEntryStore],
  template: `
  <h1>Track Entries</h1>
  <p>
    <button
      type="button"
      (click)="onAddUpdate('Add', null)"
      mat-fab
      color="accent"
      >
      <mat-icon>add</mat-icon>
    </button>
  </p>
  @if (store.loading$ | async; as loading) {
    <div> loading... </div>
  }
  
  @if (store.error$|async; as error) {
    <div style="color:red">
      Something went wrong
    </div>
  }
  
  <!-- filter -->
  <app-track-entry-filter (filterByEntryDate)="onEntryDateSelect($event)" (clearFilter)="onClearFilter()"/>
  
  <app-track-entry-list [dataSource]="(store.entries$|async)??[]" (editTrackEntry)= "onAddUpdate('Edit', $event)" (deleteTrackEntry)="onDelete($event)" (sort)="onSort($event)"/>
  
  <!-- total sleep, work etc -->
  
  @if (total$ | async; as total) {
    <div
      style="display: flex; gap: 24px; margin: 16px 0; padding: 16px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
      <div>
        <strong>Total Sleep:</strong>
        {{ total.totalSleep }} min
      </div>
      <div>
        <strong>Average Sleep:</strong>
        {{ total.averageSleepInMinutes }} min <span style="color: #666;">({{ total.averageSleepFormatted }})</span>
      </div>
      <div>
        <strong>Total Work:</strong>
        {{ total.totalWork }} min <span style="color: #666;">({{ total.totalWorkFormatted }})</span>
      </div>
    </div>
  }
  
  
  <div class="paginator" style="display:flex;gap:5px;margin:15px 0px">
    <button mat-mini-fab (click)="onPaginate('PREV')">
      <mat-icon>keyboard_arrow_left</mat-icon>
    </button>
    <button mat-mini-fab (click)="onPaginate('NEXT')">
      <mat-icon>keyboard_arrow_right</mat-icon>
    </button>
  </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TrackEntryComponent implements OnDestroy {
  dialog = inject(MatDialog);
  destroyed$ = new Subject<boolean>();
  store = inject(TrackEntryStore);

  totalWork$ = this.store.entries$.pipe(map(e => e.reduce((a, c) => a + c.totalWorkInMinutes, 0)));

  totalWorkFormatted$ = this.totalWork$.pipe(map((totalWork) => minutesToHoursMinutes(totalWork)));

  totalSleep$ = this.store.entries$.pipe(map(e => e.reduce((a, c) => a + c.totalSleepInMinutes, 0)));

  averageSleepInMinutes$ = combineLatest([this.store.entries$, this.totalSleep$]).pipe(
    map(([entries, totalSleep]) => {
      const averageSleep = entries.length > 0 ? totalSleep / entries.length : 0;
      return Math.round(averageSleep * 100) / 100;
    })
  );

  averageSleepFormatted$ = this.averageSleepInMinutes$.pipe(map((avgMinutes) => minutesToHoursMinutes(avgMinutes)
  ));

  total$ = combineLatest({
    totalSleep: this.totalSleep$,
    averageSleepInMinutes: this.averageSleepInMinutes$,
    averageSleepFormatted: this.averageSleepFormatted$,
    totalWork: this.totalWork$,
    totalWorkFormatted: this.totalWorkFormatted$
  });

  onAddUpdate(action: string, trackEntry: TrackEntryReadModel | null = null) {
    let trackEntryUpdate: TrackEntryUpdateModel | null = null;
    if (trackEntry != null) {
      trackEntryUpdate = { ...trackEntry, remarks: trackEntry.remarks ?? "" };
    }
    const dialogRef = this.dialog.open(TrackEntryDialogComponent, {
      data: { trackEntry: trackEntryUpdate, title: action + " TrackEntry" },
    });

    dialogRef.componentInstance.sumbit
      .pipe(takeUntil(this.destroyed$))
      .subscribe((submittedData) => {
        if (!submittedData) return;

        if (submittedData.trackEntryId && submittedData.trackEntryId.length > 0) {
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

  onPaginate(pageDirection: PageDirection) {
    // logic: 
    // 1.1 if items are in desc order (Which is default). next: sort by lastEntryDate asc, prev: desc order
    // 1.2 if items are in asc order. next: sort lastEntry by desc, prev: sort by asc
    // 2. Take first element
    // 3. pass this entry to track entry store to update the lastEntryDate
    combineLatest([
      this.store.entries$.pipe(distinctUntilChanged()),
      this.store.sortDirection$.pipe(distinctUntilChanged())
    ]).pipe(
      take(1),
      map(([entries, sortDirection]) => {
        const sortableEntries = [...entries];
        return sortableEntries.sort((a, b) => {
          const dateA = new Date(a.entryDate);
          const dateB = new Date(b.entryDate);
          if (sortDirection == 'asc') {
            return pageDirection == "NEXT" ? dateB.getTime() - dateA.getTime()
              : dateA.getTime() - dateB.getTime();
          }
          else {
            return pageDirection == "NEXT" ? dateA.getTime() - dateB.getTime()
              : dateB.getTime() - dateA.getTime();
          }
        });
      }),
      tap((entries) => {
        if (entries.length <= 0) return;
        const lastEntryDate = new Date(entries[0].entryDate);
        const formattedLastEntryDate = formatDateToLocalISOString(lastEntryDate).split('T')[0];
        console.log(formattedLastEntryDate);
        // Ensure atomic state update by batching after this observable completes
        setTimeout(() => {
          this.store.setPaginationParams(formattedLastEntryDate, pageDirection);
        }, 0);
      }),
      catchError(error => {
        console.log(error);
        return of(error);
      }),
      takeUntil(this.destroyed$)
    )
      .subscribe();

  }

  onSort(sortDirection: SortDirection) {
    this.store.setSortDirection(sortDirection);
  }

  onClearFilter() {
    this.store.setDateParams(null, null);
  }

  onEntryDateSelect(range: { dateFrom: string | null; dateTo: string | null; }) {
    console.log(range);
    const { dateFrom, dateTo } = range;
    if (dateFrom && dateTo) {
      this.store.setDateParams(dateFrom, dateTo);
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.unsubscribe();
  }

}