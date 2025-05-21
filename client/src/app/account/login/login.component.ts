import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrl: 'login.component.css',
    standalone: true,
    imports: [ReactiveFormsModule, MatProgressSpinnerModule, MatIconModule, MatFormFieldModule, MatInputModule, MatButtonModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoginComponent {
    fb = inject(FormBuilder);

    loginForm = this.fb.group({
        'username': ['', Validators.required],
        'password': ['', Validators.required],
    })

    get f() {
        return this.loginForm.controls;
    }

    onSubmit() {
        console.log(this.loginForm.value);
    }
}