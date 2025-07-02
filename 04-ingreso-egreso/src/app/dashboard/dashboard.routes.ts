import { Routes } from "@angular/router";
import { EstadisticaComponent } from "../ingreso-egreso/components/estadistica/estadistica.component";
import { IngresoEgresoComponent } from "../ingreso-egreso/components/ingreso-egreso.component";
import { DetalleComponent } from "../ingreso-egreso/components/detalle/detalle.component";

export const dashboardRoutes: Routes = [
    {
        path: '', component: EstadisticaComponent
    },
    {
        path: 'ingreso-egreso', component: IngresoEgresoComponent
    },
    {
        path: 'detalle', component: DetalleComponent
    }
]