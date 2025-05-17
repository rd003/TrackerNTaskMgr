import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { TaskService } from "../service/task.service";
import { AsyncPipe, DatePipe, NgFor, NgIf } from "@angular/common";
import { BehaviorSubject } from "rxjs";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { TasksByTaskHeader } from "../models/task-read-model";
import { TaskHeaderService } from "../../task-header/task-header.service";
import { TaskPriorityModel } from "../models/task-priority.model";
import { TaskStatusModel } from "../models/task-status.model";
import { FormControl } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";

@Component({
    selector: 'app-get-tasks',
    templateUrl: "get-tasks.component.html",
    styles: [``],
    standalone: true,
    imports: [NgIf, NgFor, AsyncPipe, DatePipe, MatTableModule,
        MatIconModule, MatButtonModule, MatSelectModule, MatFormFieldModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GetTasksComponent {
    private readonly _taskService = inject(TaskService);
    private readonly _taskHeaderService = inject(TaskHeaderService);

    loading$ = new BehaviorSubject<boolean>(false);
    message$ = new BehaviorSubject<string>('');
    groupedTasks$ = this._taskService.getTasks();
    taskHeaders$ = this._taskHeaderService.getTaskHeaders();
    taskPriorities$ = this._taskService.getTaskPriorities();
    taskStatuses$ = this._taskService.getTaskStatuses();

    taskStatus = new FormControl<string>('');
    taskPriority = new FormControl<string>('');
    taskHeader = new FormControl<string>('');

    displayedColumns = ["taskTitle", "status", "priority", "deadline", "scheduledAt", "tags", "action"];

    trackTaskHeaderFn(index: number, task: TasksByTaskHeader) {
        return task.taskHeaderTitle
    }

    trackTaskPriorityFn(index: number, tp: TaskPriorityModel) {
        return tp.taskPriorityId;
    }

    trackTaskStatusFn(index: number, ts: TaskStatusModel) {
        return ts.taskStatusId;
    }
}