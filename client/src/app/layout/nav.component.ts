import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { RouterModule } from "@angular/router";
@Component({
  selector: "app-nav-component",
  standalone: true,
  imports: [
    MatIconModule,
    MatListModule,
    RouterModule
  ],
  template: `
    <mat-nav-list>
      <a mat-list-item routerLink="/dashboard">
        <div class="nav-item-content">
          <mat-icon>dashboard</mat-icon>
          <span class="nav-link-text">Dashboard</span>
        </div>
      </a>
      <a mat-list-item routerLink="/track-entry">
        <div class="nav-item-content">
          <mat-icon>assessment</mat-icon>
          <span class="nav-link-text">Track Entry</span>
        </div>
      </a>
      <a mat-list-item routerLink="/task-group">
        <div class="nav-item-content">
          <mat-icon>assessment</mat-icon>
          <span class="nav-link-text">Task Group</span>
        </div>
      </a>
      <a mat-list-item routerLink="/tasks">
        <div class="nav-item-content">
          <mat-icon>assessment</mat-icon>
          <span class="nav-link-text">Tasks</span>
        </div>
      </a>
    </mat-nav-list>
  `,
  styles: [`
    .nav-item-content {
      display: flex;
      align-items: center;
      height: 100%;
    }
    
    mat-icon {
      margin-right: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .nav-link-text {
      display: flex;
      align-items: center;
    }
  `]
})
export class NavComponent {
}