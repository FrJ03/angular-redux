import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngresoEgresoComponent } from './components/ingreso-egreso.component';
import { DetalleComponent } from './components/detalle/detalle.component';
import { EstadisticaComponent } from './components/estadistica/estadistica.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutesModule } from '../dashboard/dashboard-routes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';
import { StoreModule } from '@ngrx/store';
import { ingresoEgresoReducer } from '../reducers/ingreso-egreso.reducer';



@NgModule({
  declarations: [
    IngresoEgresoComponent,
    DetalleComponent,
    EstadisticaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    BaseChartDirective,
    DashboardRoutesModule,
    StoreModule.forFeature('ingresosEgresos', ingresoEgresoReducer)
  ]
})
export class IngresoEgresoModule { }
