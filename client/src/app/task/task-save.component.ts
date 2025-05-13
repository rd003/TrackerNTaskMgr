import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { TaskStore } from "./state/task.store";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { TaskCreateModel } from "./models/task-create.model";
import { TaskService } from "./service/task.service";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { provideNativeDateAdapter } from "@angular/material/core";
import { AsyncPipe, NgFor, NgIf } from "@angular/common";
import { TaskPriorityModel } from "./models/task-priority.model";
import { TaskStatusModel } from "./models/task-status.model";

@Component({
    selector: 'app-task-save',
    standalone: true,
    imports: [
        NgIf,
        NgFor,
        AsyncPipe,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatChipsModule,
        MatCardModule,
        MatDividerModule
    ],
    providers: [provideNativeDateAdapter()],
    template: `
      <form [formGroup]="frm" (ngSubmit)="save()">
        <div class="form-row">
            <mat-form-field appearance="outline">
               <mat-label>Task Title</mat-label>
               <input matInput formControlName="taskTitle" required>
               <!-- <mat-error *ngIf="frm.get('taskTitle')?.hasError('required')">
                  Task title is required
               </mat-error> -->
            </mat-form-field>
        </div>

        <div class="form-row">
            <mat-form-field appearance="outline">
                <mat-label>Task URI</mat-label>
                <input matInput formControlName="taskUri">
            </mat-form-field>
        </div>
      
        <div class="form-row" *ngIf="taskPriorities$ | async as priorities">
             <mat-form-field appearance="outline">
                <mat-label>Priority</mat-label>
                <mat-select formControlName="taskPriorityId" required>
                  <mat-option *ngFor="let priority of priorities;trackBy:trackPriorityByFn" [value]="priority.taskPriorityId">
                    {{ priority.taskPriorityName }}
                  </mat-option>
                </mat-select>
                <!-- <mat-error *ngIf="frm.get('taskPriorityId')?.hasError('required')">
                  Priority is required
                </mat-error> -->
              </mat-form-field>
        </div>

         <!-- <div class="form-row" *ngIf="taskStatuses$ | async as statuses">
             <mat-form-field appearance="outline">
                <mat-label>Status</mat-label>
                <mat-select formControlName="taskStatusId" required>
                  <mat-option *ngFor="let status of statuses; trackBy:trackStatusByFn" [value]="status.taskStatusId">
                    {{ status.taskStatusName }}
                  </mat-option>
                </mat-select>
               
              </mat-form-field>
        </div> -->
            

      </form>   
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [`
        .form-row {
      margin-bottom: 8px;
    }
        `]
})
export class TaskSaveComponent {
    store = inject(TaskStore);
    fb = inject(FormBuilder);
    taskService = inject(TaskService);

    taskStatuses$ = this.taskService.getTaskStatuses();
    taskPriorities$ = this.taskService.getTaskPriorities();

    frm: FormGroup = this.fb.group({
        taskHeaderId: [null, Validators.required],
        taskTitle: ['', Validators.required],
        taskUri: [null],
        taskPriorityId: [null, Validators.required],
        taskStatusId: [null, Validators.required],
        deadline: [null],
        scheduledAt: [null],
        displayAtBoard: [true],
        subTasks: this.fb.array([]),
        tags: [[]],
    });

    trackPriorityByFn(index: number, priority: TaskPriorityModel) {
        return priority.taskPriorityId;
    }

    trackStatusByFn(index: number, priority: TaskStatusModel) {
        return priority.taskStatusId;
    }

    save() {
        this.store.addTask({} as TaskCreateModel);
    }


}