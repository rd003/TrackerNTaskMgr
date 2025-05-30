import { AsyncPipe, DatePipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTableModule } from "@angular/material/table";
import { TaskService } from "./service/task.service";
import { DisplayBoardTaskModel } from "./models/display-board-task.model";
import { HttpErrorResponse } from "@angular/common/http";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { BehaviorSubject, catchError, map, of, tap } from "rxjs";
import { Router, RouterModule } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

@Component({
    selector: 'app-display-board-task',
    standalone: true,
    imports: [MatTableModule, MatProgressSpinnerModule, AsyncPipe, DatePipe, MatButtonModule, MatIconModule, RouterModule],
    template: `
       @if ((loading$|async)===true) {
         <div class="mb-10">
           <mat-spinner [diameter]="50"/>
         </div>
       }
       @if (error$|async) {
         <div class="mb-10">
           Error has occured
         </div>
       }
       
       @if (tasks$|async; as tasks) {
         <div class="mb-10">
           @if (tasks.length>0) {
             <h1>Important Tasks</h1>
             <table mat-table [dataSource]="tasks" class="mat-elevation-z8">
               <ng-container matColumnDef="taskTitle">
                 <th mat-header-cell *matHeaderCellDef> Title </th>
                 <td mat-cell *matCellDef="let element"> {{element.taskTitle}} </td>
               </ng-container>
               <ng-container matColumnDef="scheduledAt">
                 <th mat-header-cell *matHeaderCellDef> scheduledAt </th>
                 <td mat-cell *matCellDef="let element"> {{element.scheduledAt | date:'dd-MMM-yyyy'}} </td>
               </ng-container>
               <ng-container matColumnDef="deadline">
                 <th mat-header-cell *matHeaderCellDef> scheduledAt </th>
                 <td mat-cell *matCellDef="let element"> {{element.deadline | date:'dd-MMM-yyyy'}} </td>
               </ng-container>
               <ng-container matColumnDef="status">
                 <th mat-header-cell *matHeaderCellDef> Status </th>
                 <td mat-cell *matCellDef="let element"> {{element.taskStatusName}} {{element.taskStatusEmoji}} </td>
               </ng-container>
               <ng-container matColumnDef="priority">
                 <th mat-header-cell *matHeaderCellDef> Priority </th>
                 <td mat-cell *matCellDef="let element"> {{element.taskPriorityName}} {{element.taskPriorityEmoji}} </td>
               </ng-container>
               <ng-container matColumnDef="actions">
                 <th mat-header-cell *matHeaderCellDef> Actions </th>
                 <td mat-cell *matCellDef="let element" class="action-cell">
                   <a mat-mini-fab area-label="task-detail" routerLink="/task-detail/{{element.taskId}}"
                     color="primary">
                     <mat-icon>assignment</mat-icon>
                   </a>
                   <button mat-mini-fab aria-label="edit-entry" color="accent" (click)="edit(element.taskId);">
                     <mat-icon>edit</mat-icon>
                   </button>
                 </td>
               </ng-container>
               <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
               <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
             </table>
           }
         </div>
       }
       `,
    styles: [`.mb10{
        margin-bottom:10px;
    }
  

:host ::ng-deep .mat-mdc-row .mat-mdc-cell.action-cell {
  padding: 0;
  min-height:55px;
}

:host ::ng-deep .action-cell {
  display: flex !important;
  gap:7px;
  align-items: center !important;
  justify-content: center !important;
}
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisplayBoardTaskComponent {
    private readonly _taskService = inject(TaskService);
    private store = new BehaviorSubject<TaskBoardState>({
        tasks: [],
        loading: false,
        error: null
    });
    private router = inject(Router);

    tasks$ = this.store.pipe(map(t => t.tasks));
    loading$ = this.store.pipe(map(t => t.loading));
    error$ = this.store.pipe(map(t => t.error));

    displayedColumns = ["taskTitle", "scheduledAt", "deadline", "status", "priority", "actions"];

    constructor() {
        this._taskService.getDisplayBoardTask()
            .pipe(tap(() => {
                this.store.next({
                    ...this.store.value,
                    loading: false
                });
            }))
            .pipe(
                tap(
                    (tasks) => {
                        this.store.next({
                            ...this.store.value,
                            tasks,
                            loading: false
                        });
                    }
                ),
                catchError((error) => {
                    console.log(error);
                    this.store.next({
                        ...this.store.value,
                        loading: false
                    });
                    return of([]);
                }),
                takeUntilDestroyed()).subscribe();
    }

    edit(taskId: number) {
        this.router.navigate([`update-task/${taskId}`]);
    }
}

export interface TaskBoardState {
    tasks: readonly DisplayBoardTaskModel[],
    loading: boolean,
    error: HttpErrorResponse | null
}