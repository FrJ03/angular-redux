import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { dashboardRoutes } from './components/dashboard/dashboard.routes';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'register', component: RegisterComponent
    },
    {
        path: '', component: DashboardComponent,
        children: dashboardRoutes,
        canActivate: [AuthGuard]
    },
    {
        path: '**', component: DashboardComponent,
        children: dashboardRoutes,
        canActivate: [AuthGuard]
    }
];
