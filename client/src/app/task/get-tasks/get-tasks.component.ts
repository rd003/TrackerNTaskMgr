import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { TaskService } from "../service/task.service";
import { AsyncPipe, DatePipe, NgFor, NgIf } from "@angular/common";
import { BehaviorSubject, combineLatest, Observable, startWith, switchMap } from "rxjs";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { TaskHeaderService } from "../../task-header/task-header.service";
import { TaskPriorityModel } from "../models/task-priority.model";
import { TaskStatusModel } from "../models/task-status.model";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { TaskHeaderModel } from "../../task-headers/models/task-header.model";
import { TasksByTaskHeader } from "../models/task-read-model";

@Component({
    selector: 'app-get-tasks',
    templateUrl: "get-tasks.component.html",
    styles: [``],
    standalone: true,
    imports: [NgIf, NgFor, AsyncPipe, DatePipe, MatTableModule,
        MatIconModule, MatButtonModule, MatSelectModule, MatFormFieldModule, ReactiveFormsModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GetTasksComponent {
    private readonly _taskService = inject(TaskService);
    private readonly _taskHeaderService = inject(TaskHeaderService);
    // private readonly dRef = inject(DestroyRef);

    loading$ = new BehaviorSubject<boolean>(false);
    message$ = new BehaviorSubject<string>('');
    taskHeaders$ = this._taskHeaderService.getTaskHeaders();
    taskPriorities$ = this._taskService.getTaskPriorities();

    taskPriority = new FormControl<number>(0);
    taskHeader = new FormControl<number>(0);


    taskHeaderId$ = this.taskHeader.valueChanges.pipe(startWith(null));
    taskPriorityId$ = this.taskPriority.valueChanges.pipe(startWith(null));


    groupedTasks$: Observable<TasksByTaskHeader[]> = combineLatest([this.taskHeaderId$, this.taskPriorityId$]).pipe(
        switchMap(([taskHeaderId, taskPriorityId]) => {
            // console.log(taskHeaderId, taskPriorityId);
            return this._taskService.getTasks(taskHeaderId, taskPriorityId);
        }));

    displayedColumns = ["taskTitle", "status", "priority", "deadline", "scheduledAt", "tags", "action"];

    clearFilter() {
        this.taskHeader.setValue(null);
        this.taskPriority.setValue(null);
    }

    trackTaskHeaderFn(index: number, task: TaskHeaderModel) {
        return task.taskHeaderId
    }

    trackTaskPriorityFn(index: number, tp: TaskPriorityModel) {
        return tp.taskPriorityId;
    }

    trackTaskStatusFn(index: number, ts: TaskStatusModel) {
        return ts.taskStatusId;
    }

}