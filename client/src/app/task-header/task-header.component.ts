import { ChangeDetectionStrategy, Component } from "@angular/core";
import { TaskHeaderStore } from "./task-header.store";
@Component({
    selector: 'app-task-header',
    standalone: true,
    imports: [],
    providers: [TaskHeaderStore],
    templateUrl: 'task-header.component.html',
    styles: [``],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskHeaderListComponent {

}