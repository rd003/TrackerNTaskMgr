import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { HttpClient, HttpParams } from "@angular/common/http";
import { TaskCreateModel } from "../models/task-create.model";
import { TaskReadModel, TasksByTaskHeader } from "../models/task-read-model";
import { map, Observable } from "rxjs";
import { TaskStatusModel } from "../models/task-status.model";
import { TaskPriorityModel } from "../models/task-priority.model";
import { SortDirection } from "@angular/material/sort";
import { TagModel } from "../models/tag.model";
import { DisplayBoardTaskModel } from "../models/display-board-task.model";

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private readonly _url = environment.baseUrl + '/tasks';
    private readonly _http = inject(HttpClient);

    addTask(task: TaskCreateModel): Observable<TaskReadModel> {
        return this._http.post<TaskReadModel>(this._url, task);
    }

    updateTask(task: TaskCreateModel): Observable<TaskReadModel> {
        return this._http.put<TaskReadModel>(`${this._url}/${task.taskId}`, task);
    }


    getTask(taskId: number) {
        return this._http.get<TaskReadModel>(`${this._url}/${taskId}`);
    }

    getTasks(taskHeaderId: number | null = null,
        taskPriorityId: number | null = null,
        tagId: number | null = null,
        sortBy: string | null = null,
        sortDirection: SortDirection = 'desc'): Observable<TasksByTaskHeader[]> {
        let parameters = new HttpParams();
        parameters = parameters.set("sortDirection", sortDirection);

        if (taskHeaderId) {
            parameters = parameters.set("taskHeaderId", taskHeaderId);
        }

        if (tagId) {
            parameters = parameters.set("tagId", tagId);
        }

        if (taskPriorityId) {
            parameters = parameters.set("taskPriorityId", taskPriorityId);
        }

        if (sortBy) {
            parameters = parameters.set("sortBy", sortBy);
        }

        return this._http.get<TaskReadModel[]>(this._url, { params: parameters }).pipe(map(this.mapTasksByGroup));
    }

    private mapTasksByGroup(tasks: TaskReadModel[]): TasksByTaskHeader[] {
        const taskMap = new Map<string, TaskReadModel[]>();

        tasks.forEach(task => {
            const headerTitle = task.taskHeaderTitle;

            if (!taskMap.has(headerTitle)) {
                taskMap.set(headerTitle, []);
            }
            taskMap.get(headerTitle)!.push(task);
        });

        const result: TasksByTaskHeader[] = Array.from(taskMap.entries()).map(([taskHeaderTitle, tasks]) => ({
            taskHeaderTitle,
            tasks
        }));

        return result;
    }

    getTaskStatuses(): Observable<TaskStatusModel[]> {
        return this._http.get<TaskStatusModel[]>(this._url + '/statuses');
    }

    getTaskPriorities(): Observable<TaskPriorityModel[]> {
        return this._http.get<TaskPriorityModel[]>(this._url + '/priorities');
    }

    getTags(): Observable<TagModel[]> {
        return this._http.get<TagModel[]>(environment.baseUrl + "/tags");
    }

    deleteTask(taskId: number): Observable<void> {
        return this._http.delete<void>(`${this._url}/${taskId}`);
    }

    getDisplayBoardTask() {
        return this._http.get<DisplayBoardTaskModel[]>(this._url + "/displayboard-tasks");
    }
}