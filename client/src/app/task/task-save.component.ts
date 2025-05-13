import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { TaskStore } from "./state/task.store";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { TaskCreateModel } from "./models/task-create.model";

@Component({
    selector: 'app-task-save',
    standalone: true,
    imports: [ReactiveFormsModule],
    template: ``,
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [``]
})
export class TaskSaveComponent {
    store = inject(TaskStore);
    fb = inject(FormBuilder);
    frm: FormGroup = this.fb.group({

    });

    save() {
        this.store.addTask({} as TaskCreateModel);
    }
}