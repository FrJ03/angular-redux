import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { dashboardRoutes } from './components/dashboard/dashboard.routes';
import { authCanMatch } from './services/auth.guard';

export const routes: Routes = [
    {
        path: 'login', component: LoginComponent,
        canMatch: [authCanMatch]
    },
    {
        path: 'register', component: RegisterComponent,
        canMatch: [authCanMatch]
    },
    {
        path: '',
        component: DashboardComponent,
        canMatch: [authCanMatch],
        children: dashboardRoutes
    },
    {
        path: '**',
        redirectTo: ''
    }
];
