import { ChangeDetectionStrategy, Component, DestroyRef, inject, Input, OnInit } from "@angular/core";
import { TaskStore } from "./state/task.store";
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { TaskCreateModel } from "./models/task-create.model";
import { TaskService } from "./service/task.service";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { provideNativeDateAdapter } from "@angular/material/core";
import { AsyncPipe, NgFor, NgIf } from "@angular/common";
import { TaskPriorityModel } from "./models/task-priority.model";
import { TaskStatusModel } from "./models/task-status.model";
import { TaskHeaderService } from "../task-header/services/task-header.service";
import { TaskHeaderReadModel } from "../task-header/models/task-header-read.model";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject, catchError, of, tap } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

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
    MatCardModule,
    MatDividerModule
  ],
  providers: [provideNativeDateAdapter()],
  template: `
    <div class="form-row" *ngIf="message$|async as message">
      {{message}} 
    </div>

    <form [formGroup]="frm" (ngSubmit)="save()">
      <div class="main-container">
        
         <div class="form-row" *ngIf="taskHeaders$|async as taskHeaders">
            <mat-form-field >
                <mat-label>Task group</mat-label>
                <mat-select formControlName="taskHeaderId">
                    <mat-option *ngFor="let th of taskHeaders" [value]="th.taskHeaderId">
                        {{th.taskHeaderTitle}}
                    </mat-option>
                </mat-select>
                <mat-error *ngIf="frm.get('taskHeaderId')?.hasError('required')">
                    Group is required
                </mat-error>
            </mat-form-field>
         </div>

        <div class="form-row">
            <mat-form-field appearance="outline" class="midInput">
               <mat-label>Task Title</mat-label>
               <input matInput formControlName="taskTitle" required>
               <mat-error *ngIf="frm.get('taskTitle')?.hasError('required')">
                  Task title is required
               </mat-error>
            </mat-form-field>
        </div>

        <div class="form-row">
            <mat-form-field appearance="outline" class="midInput">
                <mat-label>Task URI</mat-label>
                <input matInput formControlName="taskUri">
            </mat-form-field>
        </div>
      
        <div class="form-row" *ngIf="taskPriorities$ | async as priorities">
             <mat-form-field appearance="outline">
                <mat-label>Priority</mat-label>
                <mat-select formControlName="taskPriorityId">
                  <mat-option *ngFor="let priority of priorities;trackBy:trackPriorityByFn" [value]="priority.taskPriorityId">
                    {{ priority.taskPriorityName }}
                  </mat-option>
                </mat-select>
                <mat-error *ngIf="frm.get('taskPriorityId')?.hasError('required')">
                  Priority is required
                </mat-error>
              </mat-form-field>
        </div>

         <div class="form-row" *ngIf="taskStatuses$ | async as statuses">
             <mat-form-field appearance="outline">
                <mat-label>Status</mat-label>
                <mat-select formControlName="taskStatusId" required>
                  <mat-option *ngFor="let status of statuses; trackBy:trackStatusByFn" [value]="status.taskStatusId">
                    {{ status.taskStatusName }}
                  </mat-option>
                </mat-select>
                <mat-error *ngIf="frm.get('taskStatusId')?.hasError('required')">
                    Status is required
                </mat-error>
              </mat-form-field>
        </div>
      
        <div class="form-row">
            <mat-form-field>
                <mat-label>Deadline</mat-label>
                <input matInput [matDatepicker]="datline_picker" formControlName="deadline">
                <mat-hint>MM/DD/YYYY</mat-hint>
                <mat-datepicker-toggle matIconSuffix [for]="datline_picker"></mat-datepicker-toggle>
                <mat-datepicker #datline_picker></mat-datepicker>
            </mat-form-field>
        </div>

         <div class="form-row">
            <mat-form-field>
                <mat-label>Scheduled At</mat-label>
                <input matInput [matDatepicker]="sat_picker" formControlName="scheduledAt">
                <mat-hint>MM/DD/YYYY</mat-hint>
                <mat-datepicker-toggle matIconSuffix [for]="sat_picker"></mat-datepicker-toggle>
                <mat-datepicker #sat_picker></mat-datepicker>
            </mat-form-field>
        </div>

        <div class="form-row">
            <mat-checkbox formControlName="displayAtBoard">
                Display on Board
            </mat-checkbox>
        </div>

        <div class="form-row">
            <mat-form-field appearance="outline"  class="midInput">
                <mat-label>Tags (separate with comma)</mat-label>
                <input matInput formControlName="tags">
            </mat-form-field>
        </div> 

       </div>

       <mat-divider></mat-divider>

       <!-- SubTasks Section -->
            <div class="form-section" formArrayName="subTasks">
              <div class="section-header">
                <h3>Subtasks</h3>
                <button type="button" mat-mini-fab color="primary" (click)="addSubTask()">
                  <mat-icon>add</mat-icon>
                </button>
              </div>

              <div *ngFor="let subTask of subTasksFormArray.controls; let i = index" 
                   [formGroupName]="i" class="subtask-row">
                <input type="hidden" formControlName="subTaskId">

                <div class="subtask-fields">
                  <mat-form-field appearance="outline" class="subtask-title">
                    <mat-label>Subtask Title</mat-label>
                    <input matInput formControlName="subTaskTitle">
                    <mat-error *ngIf="subTask.get('subTaskTitle')?.hasError('required')">
                      Subtask title is required
                    </mat-error>
                  </mat-form-field>
                  
                  <mat-form-field appearance="outline" class="subtask-uri">
                    <mat-label>Subtask URI</mat-label>
                    <input matInput formControlName="subTaskUri">
                  </mat-form-field>
                </div>
                
                <button type="button" mat-icon-button color="warn" (click)="removeSubTask(i)">
                  <mat-icon>delete</mat-icon>
                </button>
              </div>
            </div>

            <div class="form-actions">
              <button type="button" mat-stroked-button (click)="cancel()">Cancel</button>
              <button type="submit" mat-raised-button color="primary" [disabled]="this.frm.invalid">Save</button>
            </div>
      </form>   
    `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    .main-container{
      display:flex;
      gap:15px;
      flex-wrap:wrap;
    }
    .midInput{
        width:400px;
    }
    form{
      margin-bottom:24px;
    }
        .form-row {
      margin-bottom: 8px;
    }

    .form-section {
      margin-top: 24px;
      margin-bottom: 24px;
    }
    
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    
    .subtask-row {
      display: flex;
      align-items: flex-start;
      margin-bottom: 16px;
    }
    
    .subtask-fields {
      display: flex;
      flex: 1;
      gap: 16px;
    }
    
    .subtask-title {
      flex: 3;
    }
    
    .subtask-uri {
      flex: 2;
    }
    
    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 16px;
      margin-top: 24px;
    }
        `]
})
export class TaskSaveComponent implements OnInit {
  store = inject(TaskStore);
  fb = inject(FormBuilder);
  taskService = inject(TaskService);
  taskHeaderService = inject(TaskHeaderService);
  route = inject(ActivatedRoute);
  destroyRef = inject(DestroyRef);
  message$ = new BehaviorSubject<string>("");
  loading = false;
  @Input() taskId = '';

  taskStatuses$ = this.taskService.getTaskStatuses();
  taskPriorities$ = this.taskService.getTaskPriorities();
  taskHeaders$ = this.taskHeaderService.getTaskHeaders();

  frm: FormGroup = this.fb.group({
    taskId: [0],
    taskHeaderId: [null, Validators.required],
    taskTitle: ['', Validators.required],
    taskUri: [null],
    taskPriorityId: [null, Validators.required],
    taskStatusId: [null, Validators.required],
    deadline: [null],
    scheduledAt: [null],
    displayAtBoard: [true],
    subTasks: this.fb.array([]),
    tags: '',
  });

  trackPriorityByFn(index: number, priority: TaskPriorityModel) {
    return priority.taskPriorityId;
  }

  trackStatusByFn(index: number, priority: TaskStatusModel) {
    return priority.taskStatusId;
  }

  trackHeadersByFn(index: number, header: TaskHeaderReadModel) {
    return header.taskHeaderId;
  }

  get subTasksFormArray() {
    return this.frm.get('subTasks') as FormArray;
  }

  save() {
    this.loading = true;
    var taskToSave = this.frm.value as TaskCreateModel;

    if (taskToSave.taskId < 1) {
      this.addTask(taskToSave);
    }
    else {
      this.updateTask(taskToSave);
    }
  }

  addTask(task: TaskCreateModel) {
    this.taskService.addTask(task).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: () => {
        this.setMessage("Saved successfully");
        this.cancel();
      },
      error: (error) => {
        this.setMessage("Something went wrong");
        console.log(error);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  updateTask(task: TaskCreateModel) {
    this.taskService.updateTask(task).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: () => {
        this.setMessage("Saved successfully");
      },
      error: (error) => {
        this.setMessage("Something went wrong");
        console.log(error);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  private setMessage(message: string) {
    this.message$.next(message);
  }

  addSubTask() {
    const subTaskForm = this.fb.group({
      subTaskId: [null],
      subTaskTitle: ['', Validators.required],
      subTaskUri: [null]
    });

    this.subTasksFormArray.push(subTaskForm);
  }

  removeSubTask(index: number) {
    this.subTasksFormArray.removeAt(index);
  }

  cancel() {
    this.frm.reset();
    this.subTasksFormArray.clear();
  }

  ngOnInit() {
    if (this.taskId) {
      const taskIdNum = parseInt(this.taskId);
      this.taskService.getTask(taskIdNum).pipe(
        tap((task) => {
          var taskToUpdate = {
            ...task,
            tags: task.tags ? task.tags.join(',') : ''
          } as TaskCreateModel;

          this.frm.patchValue(taskToUpdate);

          // Clear existing subtasks array
          this.subTasksFormArray.clear();

          // Add each subtask to the form array
          if (task.subTasks && task.subTasks.length > 0) {
            task.subTasks.forEach(subTask => {
              const subTaskForm = this.fb.group({
                subTaskId: [subTask.subTaskId],
                subTaskTitle: [subTask.subTaskTitle, Validators.required],
                subTaskUri: [subTask.subTaskUri]
              });
              this.subTasksFormArray.push(subTaskForm);
            });
          }

        }),
        catchError((error) => {
          this.setMessage("Something went wrong!");
          console.log(error);
          return of(error);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
        .subscribe();
    }
  }

}