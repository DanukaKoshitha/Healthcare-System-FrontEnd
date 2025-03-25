import { Routes } from '@angular/router';
import { MainDashboardComponent } from './pages/main-dashboard/main-dashboard.component';
import { RegisterFormComponent } from './pages/register-form/register-form.component';
import { UserHomePageComponent } from './pages/user-home-page/user-home-page.component';

export const routes: Routes = [
    {
        path:"",
        component:MainDashboardComponent
    },
    {
        path:"register",
        component:RegisterFormComponent
    },
    {
        path:"userHomePage",
        component:UserHomePageComponent
    }
];
