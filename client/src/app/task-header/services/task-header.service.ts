import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { TaskHeaderReadModel } from "../models/task-header-read.model";
import { TaskHeaderCreateModel } from "../models/task-header-create.model";
import { TaskHeaderUpdateModel } from "../models/task-header-update.model";


@Injectable({ providedIn: 'root' })
export class TaskHeaderService {
    private readonly url = environment.baseUrl + "/task-headers";
    private readonly http = inject(HttpClient);

    addTaskHeader(taskHeader: TaskHeaderCreateModel) {
        return this.http.post<TaskHeaderReadModel>(this.url, taskHeader);
    }

    updateTaskHeader(taskHeader: TaskHeaderUpdateModel) {
        return this.http.put<TaskHeaderUpdateModel>(`${this.url}/${taskHeader.taskHeaderId}`, taskHeader);
    }

    getTaskHeader(id: number) {
        return this.http.get<TaskHeaderReadModel>(`${this.url}/${id}`);
    }

    deleteTaskHeader(id: number) {
        return this.http.delete<void>(`${this.url}/${id}`);
    }

    getTaskHeaders() {
        return this.http.get<TaskHeaderReadModel[]>(this.url);
    }
}