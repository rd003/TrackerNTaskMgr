import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MainLayoutComponent } from "./layout/main-layout.component";
import { Router, RouterModule } from '@angular/router';
import { AuthService } from './account/services/auth.service';
import { AsyncPipe } from '@angular/common';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MainLayoutComponent, RouterModule, AsyncPipe],
  template: `
@if((isLoggedIn$|async)==true){
   <app-main-layout/>
 }
 @else{
  <router-outlet></router-outlet>
 }
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AppComponent implements OnInit {
  private authService = inject(AuthService);
  router = inject(Router);

  isLoggedIn$ = this.authService.isLoggedIn$.pipe(
    tap((isLoggedIn) => {
      if (isLoggedIn) {
        this.router.navigate([`/login`]);
      }
      this.router.navigate([`/dashboard`]);
    }),
    catchError((error) => {
      console.log(error);
      return of(null)
    })
  );


  ngOnInit(): void {

  }

}


