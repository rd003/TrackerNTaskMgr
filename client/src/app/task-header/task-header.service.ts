import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { TaskHeaderModel } from "../task-headers/models/task-header.model";

@Injectable({ providedIn: 'root' })
export class TaskHeaderService {
    private readonly _http = inject(HttpClient);
    private readonly _url = environment.baseUrl + '/task-headers';

    getTaskHeaders() {
        return this._http.get<TaskHeaderModel[]>(this._url);
    }
}