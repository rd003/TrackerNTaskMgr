import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { TaskCreateModel } from "../models/task-create.model";
import { TaskReadModel } from "../models/task-read-model";

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private readonly _url = environment.baseUrl + '/tasks';
    private readonly _http = inject(HttpClient);

    addTask(task: TaskCreateModel) {
        this._http.post<TaskReadModel>(this._url, task);
    }

}