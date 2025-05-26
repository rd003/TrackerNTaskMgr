import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { authGuard } from './account/services/auth.guard';

export const routes: Routes = [
    {
        path: "dashboard",
        component: DashboardComponent,
        canActivate: [authGuard]
    },
    {
        path: "track-entry",
        loadComponent: () => import("./track-entry/track-entry.component").then(a => a.TrackEntryComponent),
        canActivate: [authGuard]
    },
    {
        path: "create-task",
        loadComponent: () => import("./task/task-save/task-save.component").then(a => a.TaskSaveComponent),
        canActivate: [authGuard]
    },
    {
        path: "tasks",
        loadComponent: () => import("./task/get-tasks/get-tasks.component").then(a => a.GetTasksComponent),
        canActivate: [authGuard]
    },
    {
        path: "update-task/:taskId",
        loadComponent: () => import("./task/task-save/task-save.component").then(a => a.TaskSaveComponent),
        canActivate: [authGuard]
    },
    {
        path: "task-detail/:taskId",
        loadComponent: () => import("./task/task-detail/task-detail.component").then(a => a.TaskDetailComponent),
        canActivate: [authGuard]
    },
    {
        path: 'task-group',
        loadComponent: () => import("./task-header/task-header.component").then(a => a.TaskHeaderComponent),
        canActivate: [authGuard]
    },
    {
        path: 'login',
        loadComponent: () => import('./account/login/login.component').then(a => a.LoginComponent)
    },
    {
        path: "",
        redirectTo: "/login",
        pathMatch: "full"
    },
    {
        path: "**",
        loadComponent: () => import("./not-found.component").then(a => a.NotFoundComponent),
    }
];
