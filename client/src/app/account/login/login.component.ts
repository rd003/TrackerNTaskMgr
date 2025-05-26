import { ChangeDetectionStrategy, Component, DestroyRef, inject, Input, OnInit } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { AccountService } from "../services/account.service";
import { LoginModel } from "../models/login.model";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { authKeys } from "../../shared/authConst";
import { Subject, tap } from "rxjs";
import { AsyncPipe } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Router, RouterModule } from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrl: 'login.component.css',
    standalone: true,
    imports: [ReactiveFormsModule, MatProgressSpinnerModule, MatIconModule, MatFormFieldModule, MatInputModule, MatButtonModule, AsyncPipe, RouterModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoginComponent {
    @Input() returnUrl: string = "/dashboard";
    fb = inject(FormBuilder);
    accountService = inject(AccountService);
    destroyRef = inject(DestroyRef);
    loading$ = new Subject<boolean>();
    message$ = new Subject<string>();
    router = inject(Router);

    loginForm = this.fb.group({
        'username': ['', Validators.required],
        'password': ['', Validators.required],
    });

    get f() {
        return this.loginForm.controls;
    }

    onSubmit() {
        this.accountService.login(this.loginForm.value as LoginModel).pipe(
            tap(() => {
                this.loading$.next(true);
                this.router.navigate([this.returnUrl]);
            }),
            takeUntilDestroyed(this.destroyRef)
        ).subscribe({
            next: (jwt: string) => {
                localStorage.setItem(authKeys.token, jwt);
            },
            error: ((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.message$.next("Invalid username or password");
                }
                else {
                    console.error(error);
                    this.message$.next("Error has occured");
                }
            }),
            complete: () => {
                this.loading$.next(false);
                this.loginForm.reset();
            }
        });
    }


}
