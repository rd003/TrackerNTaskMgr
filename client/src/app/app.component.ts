import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MainLayoutComponent } from "./layout/main-layout.component";
import { Router, RouterModule } from '@angular/router';
import { AuthService } from './account/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MainLayoutComponent, RouterModule],
  template: `
@if(isLoggedIn){
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

  isLoggedIn = this.authService.isLoggedIn();

  ngOnInit(): void {
    if (!this.isLoggedIn) {
      this.router.navigate([`/login`]);
    }
    this.router.navigate([`/dashboard`]);
  }

}


