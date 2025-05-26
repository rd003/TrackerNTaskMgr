import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MainLayoutComponent } from "./layout/main-layout.component";
import { RouterModule } from '@angular/router';
import { AuthService } from './account/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MainLayoutComponent, RouterModule],
  template: `
  <!-- I have created separate component for layout, so the I can easily put in if block of logged user-->
  <!-- The layout will only show if admin is logged in -->
  <!-- <app-main-layout/> -->

  <router-outlet></router-outlet>
  {{isLoggedIn}}
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AppComponent {
  private authService = inject(AuthService);
  isLoggedIn = this.authService.isLoggedIn;
}


