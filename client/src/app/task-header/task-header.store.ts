import { inject, Injectable } from "@angular/core";
import { TaskHeaderReadModel } from "./models/task-header-read.model";
import { HttpErrorResponse } from "@angular/common/http";
import { TaskHeaderService } from "./services/task-header.service";
import { BehaviorSubject, map, of } from "rxjs";
import { TaskHeaderCreateModel } from "./models/task-header-create.model";
import { TaskHeaderUpdateModel } from "./models/task-header-update.model";

export interface TaskHeaderState {
    taskHeaders: TaskHeaderReadModel[],
    loading: boolean,
    error: HttpErrorResponse | null
}

@Injectable()
export class TaskHeaderStore {
    private readonly _taskHeaderService = inject(TaskHeaderService);

    private readonly _state = new BehaviorSubject<TaskHeaderState>({
        taskHeaders: [],
        loading: false,
        error: null
    });

    taskHeaders$ = this._state.pipe(map(a => a.taskHeaders));
    loading$ = this._state.pipe(map(a => a.loading));
    error$ = this._state.pipe(map(a => a.error));

    addTaskHeader(taskHeader: TaskHeaderCreateModel) {
        this.setLoading(true);
        this._taskHeaderService.addTaskHeader(taskHeader).subscribe({
            next: ((createdTaskHeader) => {
                this._state.next({
                    ...this._state.value,
                    taskHeaders: [...this._state.value.taskHeaders, createdTaskHeader],
                    loading: false
                });
            }),
            error: (this.handleError)
        });
    }

    updateTaskHeader(taskHeader: TaskHeaderUpdateModel) {
        this.setLoading(true);
        this._taskHeaderService.updateTaskHeader(taskHeader).subscribe({
            next: ((updateTaskHeader) => {
                this._state.next({
                    ...this._state.value,
                    taskHeaders: this._state.value.taskHeaders.map(t => t.taskHeaderId == updateTaskHeader.taskHeaderId ? updateTaskHeader : t),
                    loading: false
                });
            }),
            error: (this.handleError)
        });
    }

    deleteTaskHeader(taskHeaderId: number) {
        this.setLoading(true);
        this._taskHeaderService.deleteTaskHeader(taskHeaderId).subscribe({
            next: (() => {
                this._state.next({
                    ...this._state.value,
                    taskHeaders: this._state.value.taskHeaders.filter(t => t.taskHeaderId != taskHeaderId),
                    loading: false
                });
            }),
            error: (this.handleError)
        });
    }

    private setLoading(value: boolean) {
        this._state.next({ ...this._state.value, loading: value });
    }

    private handleError(error: HttpErrorResponse) {
        this._state.next({
            ...this._state.value,
            error,
            loading: false
        });
    }

    private loadTaskHeaders() {
        this.setLoading(true);
        this._taskHeaderService.getTaskHeaders().subscribe({
            next: ((taskHeaders) => {
                this._state.next({
                    ...this._state.value,
                    taskHeaders,
                    loading: false
                });
            }),
            error: (this.handleError)
        });
    }

    constructor() {
        this.loadTaskHeaders();
    }

}