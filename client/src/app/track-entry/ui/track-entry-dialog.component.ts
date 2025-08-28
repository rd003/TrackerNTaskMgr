import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Inject,
  Injector,
  Output,
  ViewChild,
} from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from "@angular/material/dialog";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { TrackEntryUpdateModel } from "../data/track-entry-create.model";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from "@angular/material/core";
import { MatTimepickerModule } from "@angular/material/timepicker";
import { CdkTextareaAutosize, TextFieldModule } from "@angular/cdk/text-field";
import { combineDateAndTime } from "../../shared/services/date.util";

@Component({
  selector: "app-track-entry-dialog",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatDatepickerModule,
    MatTimepickerModule,
    TextFieldModule
  ],
  providers: [provideNativeDateAdapter(), { provide: MAT_DATE_LOCALE, useValue: 'en-IN' }],
  template: `
      <h1 mat-dialog-title>
        {{ data.title }}
      </h1>
      <div mat-dialog-content>
        <form [formGroup]="form" class="frm">
          <input formControlName="trackEntryId" type="hidden" />
        
          <mat-form-field>
          <mat-label>EntryDate</mat-label>
            <input matInput [matDatepicker]="entryDatePicker" formControlName="entryDate">
            <mat-hint>MM/DD/YYYY</mat-hint>
            <mat-datepicker-toggle matIconSuffix [for]="entryDatePicker"></mat-datepicker-toggle>
            <mat-datepicker #entryDatePicker></mat-datepicker>
          </mat-form-field>

  
          <!-- SleptAt -->
          <mat-form-field>
            <mat-label>SleepDate</mat-label>
            <input matInput [matDatepicker]="sleepDatePicker" formControlName="sleepDate" placeholder="Choose date">
            <mat-datepicker-toggle matIconSuffix [for]="sleepDatePicker"></mat-datepicker-toggle>
            <mat-datepicker #sleepDatePicker></mat-datepicker>
          </mat-form-field>

          <mat-form-field>
            <mat-label>SleepTime</mat-label>
            <input matInput [matTimepicker]="sleetTimePicker" formControlName="sleepTime" >
            <mat-timepicker-toggle matIconSuffix [for]="sleetTimePicker"/>
            <mat-timepicker #sleetTimePicker/>
          </mat-form-field>
          
          <!-- Woke up at -->
          <mat-form-field>
            <mat-label>WokeUpDate</mat-label>
            <input matInput [matDatepicker]="wokeUpDatePicker" formControlName="wokeUpDate" placeholder="Choose date">
            <mat-datepicker-toggle matIconSuffix [for]="wokeUpDatePicker"></mat-datepicker-toggle>
            <mat-datepicker #wokeUpDatePicker></mat-datepicker>
          </mat-form-field>

          <mat-form-field>
            <mat-label>WokeUpTime</mat-label>
            <input matInput [matTimepicker]="wokeUpTimePicker" formControlName="wokeUpTime" >
            <mat-timepicker-toggle matIconSuffix [for]="wokeUpTimePicker"/>
            <mat-timepicker #wokeUpTimePicker/>
          </mat-form-field>
  
          <mat-form-field appearance="fill">
            <mat-label>Nap(minutes)</mat-label>
            <input matInput placeholder="Nap(minutes)" formControlName="napInMinutes" />
          </mat-form-field>
  
          <mat-form-field appearance="fill">
            <mat-label>TotalWork(minutes)</mat-label>
            <input matInput placeholder="TotalWork" formControlName="totalWorkInMinutes" />
          </mat-form-field>
  
          <mat-form-field appearance="fill">
            <mat-label>Remarks</mat-label>
            <textarea matInput formControlName="remarks" 
            cdkTextareaAutosize
            #autosize="cdkTextareaAutosize"
            cdkAutosizeMinRows="1"
            cdkAutosizeMaxRows="5"></textarea>
          </mat-form-field>
          

        </form>
      </div>
      <div mat-dialog-actions>
        <button
          mat-raised-button
          color="primary"
          (click)="onSubmit()"
          [disabled]="form.invalid"
          cdkFocusInitial
        >
          Save
        </button>
        <button mat-raised-button color="warn" (click)="onCanceled()">
          Close
        </button>
      </div>
    `,
  styles: [
    `
        .frm {
          display: grid;
          grid-template-columns: repeat(
            3,
            1fr
          ); /* Three columns with equal width */
          gap: 16px; /* Adjust the gap between columns as needed */
        }
      `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackEntryDialogComponent {
  @Output() sumbit = new EventEmitter<TrackEntryUpdateModel>();
  // Reason for using TrackEntryUpdateModel: We have two models TrackEntryCreateModel and TrackEntryUpdateModel
  // Since this component is used for both add and update, that is why we are using TrackEntryUpdateModel

  private _injector = inject(Injector);

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  triggerResize() {
    // Wait for content to render, then trigger textarea resize.
    afterNextRender(
      () => {
        this.autosize.resizeToFitContent(true);
      },
      {
        injector: this._injector,
      },
    );
  }

  form = new FormGroup({
    trackEntryId: new FormControl<string>(""),
    entryDate: new FormControl<Date | null>(null, Validators.required),
    sleepDate: new FormControl<Date | null>(null, Validators.required),
    sleepTime: new FormControl<Date | null>(null, Validators.required),
    wokeUpDate: new FormControl<Date | null>(null, Validators.required),
    wokeUpTime: new FormControl<Date | null>(null, Validators.required),
    napInMinutes: new FormControl<number>(0),
    totalWorkInMinutes: new FormControl<number>(0, Validators.required),
    remarks: new FormControl<string>("")
  });

  onCanceled() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.form.valid) {
      const formValues = this.form.value;

      // Convert string values to Date objects
      const sleepDate = new Date(formValues.sleepDate!);
      const sleepTime = new Date(formValues.sleepTime!);
      const wokeUpDate = new Date(formValues.wokeUpDate!);
      const wokeUpTime = new Date(formValues.wokeUpTime!);

      // Combine date and time fields
      const sleptAt = combineDateAndTime(sleepDate, sleepTime);
      const wokeUpAt = combineDateAndTime(wokeUpDate, wokeUpTime);

      const entryData: TrackEntryUpdateModel = {
        trackEntryId: formValues.trackEntryId || "",
        entryDate: formValues.entryDate as Date,
        sleptAt: sleptAt as Date,
        wokeUpAt: wokeUpAt as Date,
        napInMinutes: formValues.napInMinutes as number,
        totalWorkInMinutes: formValues.totalWorkInMinutes as number,
        remarks: formValues.remarks as string
      };
      this.sumbit.emit(entryData);
    }
  }

  constructor(
    public dialogRef: MatDialogRef<TrackEntryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { trackEntry: TrackEntryUpdateModel | null; title: string }
  ) {

    if (data.trackEntry != null) {
      this.form.patchValue({
        trackEntryId: data.trackEntry.trackEntryId,
        entryDate: data.trackEntry.entryDate,
        sleepDate: data.trackEntry.sleptAt,
        sleepTime: data.trackEntry.sleptAt,
        wokeUpDate: data.trackEntry.wokeUpAt,
        wokeUpTime: data.trackEntry.wokeUpAt,
        napInMinutes: data.trackEntry.napInMinutes,
        totalWorkInMinutes: data.trackEntry.totalWorkInMinutes,
        remarks: data.trackEntry.remarks
      });
    }
  }

}