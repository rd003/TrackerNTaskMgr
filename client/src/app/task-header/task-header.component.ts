import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { TaskHeaderStore } from "./task-header.store";
import { AsyncPipe, NgIf } from "@angular/common";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { TaskHeaderReadModel } from "./models/task-header-read.model";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";

@Component({
    selector: 'app-task-header',
    standalone: true,
    imports: [NgIf, AsyncPipe, MatProgressSpinnerModule, MatIconModule, MatTableModule, MatButtonModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule],
    providers: [TaskHeaderStore],
    templateUrl: 'task-header.component.html',
    styles: [`.mb-10{margin-bottom:10px}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class TaskHeaderComponent {
    store = inject(TaskHeaderStore);
    fb = inject(FormBuilder);

    form = this.fb.group({
        taskHeaderId: [0],
        taskHeaderTitle: ['', Validators.required],
    });

    displayedColumns = ["taskHeaderTitle", "action"];

    onEdit(taskHeader: TaskHeaderReadModel) {
        console.log(taskHeader);
    }

    onDelete(taskHeader: TaskHeaderReadModel) {
        console.log(taskHeader);
    }

    onSave() {

    }
}