import { ChangeDetectionStrategy, Component, DestroyRef, inject, Input, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { TaskCreateModel } from "../models/task-create.model";
import { TaskService } from "../service/task.service";
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
import { AsyncPipe } from "@angular/common";
import { TaskPriorityModel } from "../models/task-priority.model";
import { TaskStatusModel } from "../models/task-status.model";
import { TaskHeaderService } from "../../task-header/services/task-header.service";
import { TaskHeaderReadModel } from "../../task-header/models/task-header-read.model";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { BehaviorSubject, catchError, finalize, of, tap } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: 'app-task-save',
  standalone: true,
  imports: [
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
    MatDividerModule,
    MatProgressSpinnerModule,
    RouterModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: "task-save.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: "task-save.component.css"
})
export class TaskSaveComponent implements OnInit {
  fb = inject(FormBuilder);
  taskService = inject(TaskService);
  taskHeaderService = inject(TaskHeaderService);
  route = inject(ActivatedRoute);
  destroyRef = inject(DestroyRef);
  message$ = new BehaviorSubject<string>("");
  loading$ = new BehaviorSubject<boolean>(false);
  @Input() taskId = '';

  taskStatuses$ = this.taskService.getTaskStatuses();
  taskPriorities$ = this.taskService.getTaskPriorities();
  taskHeaders$ = this.taskHeaderService.getTaskHeaders();

  frm: FormGroup = this.fb.group({
    taskId: [""],
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
    this.setLoading(true);
    var taskToSave = this.frm.value as TaskCreateModel;
    if (taskToSave.taskId && taskToSave.taskId.length > 0) {
      this.updateTask(taskToSave);
    }
    else {
      this.addTask(taskToSave);
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
        this.setLoading(false);
      }
    });
  }

  updateTask(task: TaskCreateModel) {
    this.taskService.updateTask(task).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: () => {
        this.setMessage("Saved successfully");
        this.setLoading(false);
      },
      error: (error) => {
        this.setMessage("Something went wrong");
        console.log(error);
      },
      complete: () => {
        this.setLoading(false);
      }
    });
  }

  private setMessage(message: string) {
    this.message$.next(message);
  }

  private setLoading(flag: boolean) {
    this.loading$.next(flag);
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
      this.setLoading(true);
      this.taskService.getTask(this.taskId).pipe(
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
        finalize(() => this.setLoading(false)),
        takeUntilDestroyed(this.destroyRef)
      )
        .subscribe();
    }
  }

}