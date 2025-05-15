import { inject, Injectable } from "@angular/core";
import { TaskReadModel } from "../models/task-read-model";
import { HttpErrorResponse } from "@angular/common/http";
import { BehaviorSubject, catchError, map, of, tap } from "rxjs";
import { TaskService } from "../service/task.service";

export interface TaskState {
    tasks: readonly TaskReadModel[],
    loading: boolean,
    error: HttpErrorResponse | null
}

export const _initialState: TaskState = {
    tasks: [],
    loading: false,
    error: null
}

@Injectable({
    providedIn: 'root'
})
export class TaskStore {
    private readonly _state$ = new BehaviorSubject<TaskState>(_initialState);
    private readonly _taskService = inject(TaskService);

    tasks = this._state$.pipe(map(a => a.tasks));
    loading = this._state$.pipe(map(a => a.loading));
    error = this._state$.pipe(map(a => a.error));

    private setLoading() {
        this._state$.next({ ...this._state$.value, loading: true });
    }

    private handlError(error: HttpErrorResponse) {
        this._state$.next({ ...this._state$.value, loading: false, error });
        return of(error);
    }

}