import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { TaskService } from "../service/task.service";
import { AsyncPipe, DatePipe, NgFor, NgIf } from "@angular/common";
import { BehaviorSubject } from "rxjs";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { TasksByTaskHeader } from "../models/task-read-model";

@Component({
    selector: 'app-get-tasks',
    templateUrl: "get-tasks.component.html",
    styles: [``],
    standalone: true,
    imports: [NgIf, NgFor, AsyncPipe, DatePipe, MatTableModule, MatIconModule, MatButtonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GetTasksComponent {
    private readonly _taskService = inject(TaskService);
    loading$ = new BehaviorSubject<boolean>(false);
    message$ = new BehaviorSubject<string>('');
    groupedTasks$ = this._taskService.getTasks();

    displayedColumns = ["taskTitle", "status", "priority", "deadline", "scheduledAt", "tags", "action"];

    trackTasksFn(index: number, task: TasksByTaskHeader) {
        return task.taskHeaderTitle
    }
}