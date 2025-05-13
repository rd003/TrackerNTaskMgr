import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

export const routes: Routes = [
    {
        path: "dashboard",
        component: DashboardComponent
    },
    {
        path: "track-entry",
        loadComponent: () => import("./track-entry/track-entry.component").then(a => a.TrackEntryComponent)
    },
    {
        path: "tasks",
        loadComponent: () => import("./task/task-save.component").then(a => a.TaskSaveComponent)
    },
    {
        path: "",
        redirectTo: "/dashboard",
        pathMatch: "full"
    },
    {
        path: "**",
        loadComponent: () => import("./not-found.component").then(a => a.NotFoundComponent),
    }
];
