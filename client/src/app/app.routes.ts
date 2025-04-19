import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

export const routes: Routes = [{
   path:"dashboard",
   component: DashboardComponent       
},
{
    path:"",
    redirectTo:"/dashboard",
    pathMatch:"full"
},
{
    path:"**",
    loadComponent:()=>import("./not-found.component").then(a=>a.NotFoundComponent),
}
];
