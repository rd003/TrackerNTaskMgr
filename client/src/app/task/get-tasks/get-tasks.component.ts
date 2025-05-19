import { ChangeDetectionStrategy, Component, DestroyRef, inject } from "@angular/core";
import { TaskService } from "../service/task.service";
import { AsyncPipe, DatePipe, NgFor, NgIf } from "@angular/common";
import { BehaviorSubject, catchError, combineLatest, finalize, Observable, of, startWith, switchMap, tap } from "rxjs";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { TaskHeaderService } from "../../task-header/services/task-header.service";
import { TaskPriorityModel } from "../models/task-priority.model";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { TaskHeaderReadModel } from "../../task-header/models/task-header-read.model";
import { TaskReadModel, TasksByTaskHeader } from "../models/task-read-model";
import { TagModel } from "../models/tag.model";
import { Router, RouterModule } from "@angular/router";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { MatSortModule, Sort } from "@angular/material/sort";
import { SortModel } from "../../shared/sort.model";
import { SortDirection } from "../../shared/sort-direction";

@Component({
    selector: 'app-get-tasks',
    templateUrl: "get-tasks.component.html",
    styles: [`
    .form-row{
        margin-bottom: 10px;
    }
    `],
    standalone: true,
    imports: [NgIf, NgFor, AsyncPipe, DatePipe, MatTableModule,
        MatIconModule, MatButtonModule, MatSelectModule, MatFormFieldModule, ReactiveFormsModule, RouterModule, MatProgressSpinnerModule, MatSortModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GetTasksComponent {
    private readonly _taskService = inject(TaskService);
    private readonly _taskHeaderService = inject(TaskHeaderService);
    router = inject(Router);
    destroyRef = inject(DestroyRef);

    loading$ = new BehaviorSubject<boolean>(false);
    message$ = new BehaviorSubject<string>('');
    taskHeaders$ = this._taskHeaderService.getTaskHeaders();
    taskPriorities$ = this._taskService.getTaskPriorities();
    tags$ = this._taskService.getTags();
    isDeleted$ = new BehaviorSubject<boolean>(false);
    sort$ = new BehaviorSubject<SortModel>({ sortColumn: null, sortDirection: 'desc' });

    taskPriority = new FormControl<number>(0);
    taskHeader = new FormControl<number>(0);
    tag = new FormControl<number>(0);

    taskHeaderId$ = this.taskHeader.valueChanges.pipe(startWith(null));
    taskPriorityId$ = this.taskPriority.valueChanges.pipe(startWith(null));
    tagId$ = this.tag.valueChanges.pipe(startWith(null));

    groupedTasks$: Observable<TasksByTaskHeader[]> = combineLatest([this.taskHeaderId$, this.taskPriorityId$, this.tagId$, this.isDeleted$, this.sort$]).pipe(
        tap(() => this.setLoading(true)),
        switchMap(([taskHeaderId, taskPriorityId, tagId, isDeleted, sort]) => {
            return this._taskService.getTasks(taskHeaderId, taskPriorityId, tagId, sort.sortColumn, sort.sortDirection).pipe(
                catchError((error) => {
                    console.log(error);
                    this.message$.next("Error has occurred");
                    return of([]);
                })
            );
        })
    ).pipe(
        tap(_ => this.setLoading(false))
    );

    setLoading(val: boolean) {
        this.loading$.next(val);
    }

    displayedColumns = ["taskTitle", "status", "priority", "deadline", "scheduledAt", "tags", "action"];

    clearFilter() {
        // this is crap: It is making api call 3 or 4 times
        this.taskHeader.setValue(null);
        this.taskPriority.setValue(null);
        this.tag.setValue(null);
        this.sort$.next({ sortColumn: null, sortDirection: 'desc' });
    }

    trackTaskHeaderFn(index: number, task: TaskHeaderReadModel) {
        return task.taskHeaderId
    }

    trackTaskPriorityFn(index: number, tp: TaskPriorityModel) {
        return tp.taskPriorityId;
    }

    trackTagsFn(index: number, tag: TagModel) {
        return tag.tagId;
    }

    editTask(task: TaskReadModel) {
        this.router.navigate([`update-task/${task.taskId}`])
    }

    deleteTask(task: TaskReadModel) {
        if (confirm(`Are you sure to delete : ${task.taskTitle}`)) {
            this.setLoading(true);

            this._taskService.deleteTask(task.taskId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
                next: () => {
                    this.isDeleted$.next(true);
                },
                error: (error) => {
                    console.log(error);
                    this.message$.next("Error!");
                },
                complete: () => {
                    this.setLoading(false);
                }
            });
        }
    }

    onSort(sortState: Sort) {
        const sort: SortModel = {
            sortDirection: sortState.direction as SortDirection,
            sortColumn: sortState.active
        };
        this.sort$.next(sort);
    }
}