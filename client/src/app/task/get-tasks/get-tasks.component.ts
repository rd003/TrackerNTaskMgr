import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { TaskService } from "../service/task.service";
import { AsyncPipe, DatePipe, NgFor, NgIf } from "@angular/common";
import { BehaviorSubject, catchError, combineLatest, Observable, of, startWith, switchMap } from "rxjs";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { TaskHeaderService } from "../../task-header/task-header.service";
import { TaskPriorityModel } from "../models/task-priority.model";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { TaskHeaderModel } from "../../task-headers/models/task-header.model";
import { TaskReadModel, TasksByTaskHeader } from "../models/task-read-model";
import { TagModel } from "../models/tag.model";
import { Router, RouterModule } from "@angular/router";

@Component({
    selector: 'app-get-tasks',
    templateUrl: "get-tasks.component.html",
    styles: [``],
    standalone: true,
    imports: [NgIf, NgFor, AsyncPipe, DatePipe, MatTableModule,
        MatIconModule, MatButtonModule, MatSelectModule, MatFormFieldModule, ReactiveFormsModule, RouterModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GetTasksComponent {
    private readonly _taskService = inject(TaskService);
    private readonly _taskHeaderService = inject(TaskHeaderService);
    router = inject(Router);

    loading$ = new BehaviorSubject<boolean>(false);
    message$ = new BehaviorSubject<string>('');
    taskHeaders$ = this._taskHeaderService.getTaskHeaders();
    taskPriorities$ = this._taskService.getTaskPriorities();
    tags$ = this._taskService.getTags();

    taskPriority = new FormControl<number>(0);
    taskHeader = new FormControl<number>(0);
    tag = new FormControl<number>(0);

    taskHeaderId$ = this.taskHeader.valueChanges.pipe(startWith(null));
    taskPriorityId$ = this.taskPriority.valueChanges.pipe(startWith(null));
    tagId$ = this.tag.valueChanges.pipe(startWith(null));

    groupedTasks$: Observable<TasksByTaskHeader[]> = combineLatest([this.taskHeaderId$, this.taskPriorityId$, this.tagId$]).pipe(
        switchMap(([taskHeaderId, taskPriorityId, tagId]) => {
            //console.log(taskHeaderId, taskPriorityId, tagId);
            return this._taskService.getTasks(taskHeaderId, taskPriorityId, tagId);
        }), catchError((error) => {
            console.log(error);
            this.message$.next("Error has occured");
            return of(error);
        }));

    displayedColumns = ["taskTitle", "status", "priority", "deadline", "scheduledAt", "tags", "action"];

    clearFilter() {
        this.taskHeader.setValue(null);
        this.taskPriority.setValue(null);
        this.tag.setValue(null);
    }

    trackTaskHeaderFn(index: number, task: TaskHeaderModel) {
        return task.taskHeaderId
    }

    trackTaskPriorityFn(index: number, tp: TaskPriorityModel) {
        return tp.taskPriorityId;
    }

    trackTagsFn(index: number, tag: TagModel) {
        return tag.tagId;
    }

    editTask(task: TaskReadModel) {
        this.router.navigate([`update-task/${task.taskId}`])
    }

    deleteTask(task: TaskReadModel) {
        if (confirm(`Are you sure to delete : ${task.taskTitle}`)) {
            alert('deleted');
        }
    }

}