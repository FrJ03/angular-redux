import { NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard.component';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { dashboardRoutes as routes } from './dashboard.routes';
import { SharedModule } from '../shared/shared.module';

const dashboardRoutes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: routes
  },
]

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    RouterOutlet,
    RouterModule.forChild(dashboardRoutes),
    SharedModule
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutesModule { }
