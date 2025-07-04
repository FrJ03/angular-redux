import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { dashboardRoutes } from './components/dashboard/dashboard.routes';

export const routes: Routes = [
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'register', component: RegisterComponent
    },
    {
        path: '',
        component: DashboardComponent,
        children: dashboardRoutes
    },
    {
        path: '**',
        redirectTo: ''
    }
    /*
    {
        path: '',
        canMatch: [AuthGuard],
        loadChildren: () => import('./ingreso-egreso/ingreso-egreso.module')
        .then(m => m.IngresoEgresoModule)
    },
    {
        path: '**', redirectTo: ''
    }*/
];
