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
         <mat-icon>dashboard</mat-icon>
         <span class="nav-link-text">Dashboard</span>
       </a>
       <a mat-list-item routerLink="/track-entry">
         <mat-icon>assessment</mat-icon>
         <span class="nav-link-text">Track Entry</span>
       </a>
        <!-- <a mat-list-item routerLink="/create-task">
         <mat-icon>assessment</mat-icon>
         <span class="nav-link-text">+ Task</span>
       </a> -->

       <a mat-list-item routerLink="/tasks">
         <mat-icon>assessment</mat-icon>
         <span class="nav-link-text">Tasks</span>
       </a>
       <a mat-list-item routerLink="/settings">
         <mat-icon>settings</mat-icon>
         <span class="nav-link-text">Settings</span>
       </a>
     </mat-nav-list>
    `,
})

export class NavComponent {

}