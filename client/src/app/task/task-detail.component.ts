import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from "@angular/core";
import { TaskService } from "./service/task.service";
import { TaskReadModel } from "./models/task-read-model";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
    selector: 'app-task-detail',
    standalone: true,
    imports: [],
    template: ``,
    styles: [`.mb10{
        margin-bottom:10px;
    }`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskDetailComponent implements OnInit {
    private readonly _taskService = inject(TaskService);
    @Input() taskId = 0;

    ngOnInit(): void {
        console.log(this.taskId);
    }

}

export interface TaskDetailState {
    task: TaskReadModel,
    loading: boolean,
    error: HttpErrorResponse | null
}