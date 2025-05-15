import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { TaskService } from "../service/task.service";
import { AsyncPipe, NgIf } from "@angular/common";
import { BehaviorSubject } from "rxjs";

@Component({
    selector: 'app-get-tasks',
    templateUrl: "get-tasks.component.html",
    styles: [``],
    standalone: true,
    imports: [NgIf, AsyncPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GetTasksComponent {
    private readonly _taskService = inject(TaskService);
    loading$ = new BehaviorSubject<boolean>(false);
    message$ = new BehaviorSubject<string>('');
    tasks$ = this._taskService.getTasks();
}