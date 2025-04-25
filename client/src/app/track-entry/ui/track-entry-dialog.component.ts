import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Inject,
    Output,
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
import { provideNativeDateAdapter } from "@angular/material/core";
  @Component({
    selector: "app-track-entry-dialog",
    standalone: true,
    imports: [
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatDialogModule,
      MatDatepickerModule
    ],
    providers: [provideNativeDateAdapter()],
    template: `
      <h1 mat-dialog-title>
        {{ data.title }}
      </h1>
      <div mat-dialog-content>
        <form [formGroup]="form" class="frm">
          <input formControlName="id" type="hidden" />
        
          <mat-form-field>
          <mat-label>EntryDate</mat-label>
            <input matInput [matDatepicker]="entryDatePicker" formControlName="entryDate">
            <mat-hint>MM/DD/YYYY</mat-hint>
            <mat-datepicker-toggle matIconSuffix [for]="entryDatePicker"></mat-datepicker-toggle>
            <mat-datepicker #entryDatePicker></mat-datepicker>
          </mat-form-field>

  
          <mat-form-field appearance="fill">
            <mat-label>SleptAt</mat-label>
            <input matInput placeholder="author" formControlName="sleptAt" />
          </mat-form-field>
  
          <mat-form-field appearance="fill">
            <mat-label>WokeUpAt</mat-label>
            <input matInput placeholder="language" formControlName="wokeUpAt" />
          </mat-form-field>
  
          <mat-form-field appearance="fill">
            <mat-label>NapInMinutes</mat-label>
            <input matInput placeholder="price" formControlName="napInMinutes" />
          </mat-form-field>
  
          <mat-form-field appearance="fill">
            <mat-label>Pages</mat-label>
            <input matInput placeholder="pages" formControlName="Pages" />
          </mat-form-field>
  
          <mat-form-field appearance="fill">
            <mat-label>TotalWorkInMinutes</mat-label>
            <input matInput placeholder="year" formControlName="totalWorkInMinutes" />
          </mat-form-field>
  
          <mat-form-field appearance="fill">
            <mat-label>Remarks</mat-label>
            <input matInput placeholder="country" formControlName="remarks" />
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
    
    form = new FormGroup({
      id: new FormControl<number>(0),
      entryDate: new FormControl<string>("", Validators.required),
      sleptAt: new FormControl<string>("", Validators.required),
      wokeUpAt: new FormControl<string>("", Validators.required),
      napInMinutes: new FormControl<number>(0),
      totalWorkInMinutes: new FormControl<number>(0, Validators.required),
      remarks: new FormControl<string>("")
    });

    onCanceled() {
      this.dialogRef.close();
    }

    onSubmit() {
      if (this.form.valid) {
        const entryData:TrackEntryUpdateModel = Object.assign(this.form.value);
        this.sumbit.emit(entryData);
      }
    }
    constructor(
      public dialogRef: MatDialogRef<TrackEntryDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: { trackEntry: TrackEntryUpdateModel | null; title: string }
    ) {
      if (data.trackEntry != null) {
        this.form.patchValue(data.trackEntry);
      }
    }
  }