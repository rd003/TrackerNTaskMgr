import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { TaskCreateModel } from "../models/task-create.model";
import { TaskReadModel } from "../models/task-read-model";
import { Observable } from "rxjs";
import { TaskStatusModel } from "../models/task-status.model";
import { TaskPriorityModel } from "../models/task-priority.model";

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private readonly _url = environment.baseUrl + '/tasks';
    private readonly _http = inject(HttpClient);

    addTask(task: TaskCreateModel): Observable<TaskReadModel> {
        return this._http.post<TaskReadModel>(this._url, task);
    }

    getTaskStatuses(): Observable<TaskStatusModel[]> {
        return this._http.get<TaskStatusModel[]>(this._url + '/statuses');
    }

    getTaskPriorities(): Observable<TaskPriorityModel[]> {
        return this._http.get<TaskPriorityModel[]>(this._url + '/priorities');
    }

}