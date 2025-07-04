import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { dashboardRoutes } from './components/dashboard/dashboard.routes';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
    {
        path: 'login', component: LoginComponent,
        canMatch: [AuthGuard],
    },
    {
        path: 'register', component: RegisterComponent,
        canMatch: [AuthGuard],
    },
    {
        path: '',
        component: DashboardComponent,
        canMatch: [AuthGuard],
        children: dashboardRoutes
    },
    {
        path: '**',
        redirectTo: '',
        canMatch: [AuthGuard],
    }
];
