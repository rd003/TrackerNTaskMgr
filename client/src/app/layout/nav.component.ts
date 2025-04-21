import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";

@Component({
    selector:"app-nav-component",
    standalone:true,
    imports:[
    MatIconModule,
    MatListModule,
    ],
    template:`
    <mat-nav-list>
       <a mat-list-item routerLink="/dashboard">
         <mat-icon>dashboard</mat-icon>
         <span class="nav-link-text">Dashboard</span>
       </a>
       <a mat-list-item routerLink="/users">
         <mat-icon>people</mat-icon>
         <span class="nav-link-text">Users</span>
       </a>
       <a mat-list-item routerLink="/reports">
         <mat-icon>assessment</mat-icon>
         <span class="nav-link-text">Reports</span>
       </a>
       <a mat-list-item routerLink="/settings">
         <mat-icon>settings</mat-icon>
         <span class="nav-link-text">Settings</span>
       </a>
     </mat-nav-list>
    `,
})

export class NavComponent
{

}