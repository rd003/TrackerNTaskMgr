import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { TaskHeaderStore } from "./task-header.store";
import { AsyncPipe } from "@angular/common";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { TaskHeaderReadModel } from "./models/task-header-read.model";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { TaskHeaderCreateModel } from "./models/task-header-create.model";
import { TaskHeaderUpdateModel } from "./models/task-header-update.model";

@Component({
    selector: 'app-task-header',
    standalone: true,
    imports: [AsyncPipe, MatProgressSpinnerModule, MatIconModule, MatTableModule, MatButtonModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule],
    providers: [TaskHeaderStore],
    templateUrl: 'task-header.component.html',
    styles: [`
    .mb-10{margin-bottom:10px}
    
    :host ::ng-deep .mat-mdc-row .mat-mdc-cell.action-cell {
  padding: 0;
  min-height:55px;
}

:host ::ng-deep .action-cell {
  display: flex !important;
  gap:7px;
  align-items: center !important;
  justify-content: center !important;
}
   
        `],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class TaskHeaderComponent {
    store = inject(TaskHeaderStore);
    fb = inject(FormBuilder);

    form = this.fb.group({
        taskHeaderId: [0],
        taskHeaderTitle: ['', Validators.required],
        sortOrder: [0, Validators.required],
    });

    displayedColumns = ["taskHeaderTitle", "sortOrder", "action"];

    onEdit(taskHeader: TaskHeaderReadModel) {
        this.form.patchValue(taskHeader);
    }

    onDelete(taskHeader: TaskHeaderReadModel) {
        if (confirm(`Ary you sure to delete: ${taskHeader.taskHeaderTitle}`)) {
            this.store.deleteTaskHeader(taskHeader.taskHeaderId);
        }
    }

    onSave() {
        var submittedData = this.form.value;

        if (submittedData.taskHeaderId == null || submittedData.taskHeaderId < 1) {
            this.store.addTaskHeader(submittedData as TaskHeaderCreateModel);
        }

        else {
            this.store.updateTaskHeader(submittedData as TaskHeaderUpdateModel);
        }
        this.form.reset();
    }
}