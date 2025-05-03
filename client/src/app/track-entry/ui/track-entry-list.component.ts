import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { TrackEntryReadModel } from "../data/track-entry-read.model";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { DatePipe } from "@angular/common";
import { Sort, MatSortModule, SortDirection } from '@angular/material/sort';

@Component({
  selector: 'app-track-entry-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, DatePipe, MatSortModule],
  template: `
    <table mat-table [dataSource]="dataSource" class="mat-elevation-z8" matSort (matSortChange)="onSort($event)">

<!-- Date Column -->
<ng-container matColumnDef="entryDate">
  <th mat-header-cell *matHeaderCellDef mat-sort-header> Date </th>
  <td mat-cell *matCellDef="let element"> {{element.entryDate | date:'dd-MMM-yyyy'}} </td>
</ng-container>

<!-- SleptAt Column -->
<ng-container matColumnDef="sleptAt">
  <th mat-header-cell *matHeaderCellDef> SleptAt </th>
  <td mat-cell *matCellDef="let element"> {{element.sleptAt | date:'dd-MMM-yyyy h:mm:ss a'}} </td>
</ng-container>

<!-- WokeUpAt Column -->
<ng-container matColumnDef="wokeUpAt">
  <th mat-header-cell *matHeaderCellDef> WokeUpAt </th>
  <td mat-cell *matCellDef="let element"> {{element.wokeUpAt | date:'dd-MMM-yyyy h:mm:ss a'}} </td>
</ng-container>

<!-- Nap In Minutes Column -->
<ng-container matColumnDef="napInMinutes">
  <th mat-header-cell *matHeaderCellDef> Nap(Min) </th>
  <td mat-cell *matCellDef="let element"> {{element.napInMinutes}} </td>
</ng-container>

<!-- totalSleepInMinutes Column -->
<ng-container matColumnDef="totalSleepInMinutes">
  <th mat-header-cell *matHeaderCellDef> TotalSleep(Min) </th>
  <td mat-cell *matCellDef="let element"> {{element.totalSleepInMinutes}} </td>
</ng-container>

<!-- totalWork Column -->
<ng-container matColumnDef="totalWorkInMinutes">
  <th mat-header-cell *matHeaderCellDef> TotalWorkInMinutes(Min) </th>
  <td mat-cell *matCellDef="let element"> {{element.totalWorkInMinutes}} </td>
</ng-container>

<!-- Remarks -->
<!-- TODO: Remarks can be very large, it is better to display it in separate component -->

<ng-container matColumnDef="trackEntryRemark">
  <th mat-header-cell *matHeaderCellDef> Remarks </th>
  <td mat-cell *matCellDef="let element"> {{element.trackEntryRemark?.remarks}} </td>
</ng-container>

<!-- Actions -->

<ng-container matColumnDef="action">
  <th mat-header-cell *matHeaderCellDef> Actions </th>
  <td mat-cell *matCellDef="let element" style="display: flex;gap:7px;"> 
  <button mat-mini-fab aria-label="edit-entry" color="accent" (click)="onEdit(element);">
     <mat-icon>edit</mat-icon>
  </button>
  <button mat-mini-fab aria-label="delete-entry" color="warn" (click)="this.deleteTrackEntry.emit(element)">
     <mat-icon>delete</mat-icon>
  </button>  
  </td>
</ng-container>

<tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
<tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
</table>
    `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TrackEntryListComponent {
  displayedColumns = ["entryDate", "sleptAt", "wokeUpAt", "napInMinutes", "totalSleepInMinutes", "totalWorkInMinutes", "trackEntryRemark", "action"];
  @Input({ required: true }) dataSource!: readonly TrackEntryReadModel[];
  @Output() editTrackEntry = new EventEmitter<TrackEntryReadModel>();
  @Output() deleteTrackEntry = new EventEmitter<TrackEntryReadModel>();
  @Output() sort = new EventEmitter<SortDirection>();
  onEdit(trackEntry: TrackEntryReadModel) {
    this.editTrackEntry.emit(trackEntry)
  }

  onSort(sortState: Sort) {
    const sortDirection = sortState.direction as SortDirection;
    this.sort.emit(sortDirection);
  }
}