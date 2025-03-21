import { Routes } from '@angular/router';
import { MainDashboardComponent } from './pages/main-dashboard/main-dashboard.component';
import { LoginFormComponent } from './pages/login-form/login-form.component';
import { RegisterFormComponent } from './pages/register-form/register-form.component';

export const routes: Routes = [
    {
        path:"",
        component:MainDashboardComponent
    },
    {
        path:"register",
        component:RegisterFormComponent
    }
];
