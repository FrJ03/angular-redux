import { Routes } from "@angular/router";
import { MovementsComponent } from "./movements/movements.component";

export const dashboardRoutes: Routes = [
    {
        path: 'movements', component: MovementsComponent
    }
]