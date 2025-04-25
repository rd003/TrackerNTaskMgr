import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MainLayoutComponent } from "./layout/main-layout.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MainLayoutComponent],
  template: `
  <!-- I have created separate component for layout, so the I can easily put in if block of logged user-->
  <!-- The layout will only show if admin is logged in -->
  <app-main-layout/>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush, 
})

export class AppComponent {
}
