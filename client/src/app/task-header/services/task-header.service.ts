import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { TaskHeaderReadModel } from "../models/task-header-read.model";

@Injectable({ providedIn: 'root' })
export class TaskHeaderService {
    private readonly url = environment.baseUrl + "/task-headers";
    private readonly http = inject(HttpClient);

    getTaskHeaders() {
        return this.http.get<TaskHeaderReadModel[]>(this.url);
    }
}