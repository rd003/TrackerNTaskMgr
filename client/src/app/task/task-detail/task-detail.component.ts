import { ChangeDetectionStrategy, Component, DestroyRef, inject, Input, OnInit } from "@angular/core";
import { TaskService } from "../service/task.service";
import { TaskReadModel } from "../models/task-read-model";
import { HttpErrorResponse } from "@angular/common/http";
import { AsyncPipe, DatePipe, JsonPipe } from "@angular/common";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { BehaviorSubject, catchError, map, of, tap } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { RouterModule } from "@angular/router";

@Component({
    selector: 'app-task-detail',
    standalone: true,
    imports: [AsyncPipe, MatProgressSpinnerModule, MatIconModule, MatButtonModule, DatePipe, RouterModule],
    templateUrl: 'task-detail.component.html',
    styleUrl: 'task-detail.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskDetailComponent implements OnInit {
    private readonly _taskService = inject(TaskService);
    @Input() taskId = 0;
    private store = new BehaviorSubject<TaskDetailState>({
        task: {} as any,
        loading: false,
        error: null
    });

    task$ = this.store.pipe(map(a => a.task));
    loading$ = this.store.pipe(map(a => a.loading));
    error$ = this.store.pipe(map(a => a.error));

    destroyRef = inject(DestroyRef);

    ngOnInit(): void {
        if (this.taskId) {
            this.setLoading();
            this._taskService.getTask(this.taskId)
                .pipe(
                    tap((task) => {
                        this.store.next({ ...this.store.value, task, loading: false });
                    }),
                    catchError((error) => {
                        console.log(error);
                        this.store.next({ ...this.store.value, error, loading: false });
                        return of(null);
                    }),
                    takeUntilDestroyed(this.destroyRef),
                ).subscribe();
        }
    }

    private setLoading() {
        this.store.next({
            ...this.store.value,
            loading: true
        });
    }

}

export interface TaskDetailState {
    task: TaskReadModel,
    loading: boolean,
    error: HttpErrorResponse | null
}