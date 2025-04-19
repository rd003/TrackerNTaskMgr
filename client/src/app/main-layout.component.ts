import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterOutlet } from '@angular/router';

@Component({
 selector:"app-main-layout",
 standalone:true,
 imports: [
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    RouterOutlet
  ],
 template:`<div class="dashboard-container">
 <mat-toolbar color="primary" class="toolbar">
   <button mat-icon-button (click)="sidenav.toggle()">
     <mat-icon>menu</mat-icon>
   </button>
   <span class="spacer"></span>
   <div class="user-section">
     <span class="username">Admin</span>
     <button mat-button (click)="({})">
       <mat-icon>exit_to_app</mat-icon> Logout
     </button>
   </div>
 </mat-toolbar>

 <mat-sidenav-container class="sidenav-container">
   <mat-sidenav #sidenav mode="side" opened class="sidenav">
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
   </mat-sidenav>

   <mat-sidenav-content class="content-container">
     <div class="content">
       <mat-card>
         <mat-card-content>
             <router-outlet/>
         </mat-card-content>
       </mat-card>
     </div>
   </mat-sidenav-content>
 </mat-sidenav-container>
</div>`,
 styles:[`
    .dashboard-container {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }
    
    .toolbar {
      position: relative;
      z-index: 2;
    }
    
    .spacer {
      flex: 1 1 auto;
    }
    
    .user-section {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    
    .username {
      font-weight: 500;
    }
    
    .sidenav-container {
      flex: 1;
    }
    
    .sidenav {
      width: 250px;
      padding-top: 8px;
    }
    
    .nav-link-text {
      margin-left: 8px;
    }
    
    .content-container {
      padding: 20px;
      background-color: #f5f5f5;
    }
    
    .content {
      max-width: 1200px;
      margin: 0 auto;
    }`]
})

export class MainLayoutComponent
{

}