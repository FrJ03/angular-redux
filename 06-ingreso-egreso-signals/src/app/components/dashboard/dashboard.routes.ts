import { Routes } from "@angular/router";
import { MovementsComponent } from "./movements/movements.component";
import { DetailsComponent } from "./details/details.component";

export const dashboardRoutes: Routes = [
    {
        path: 'movements', component: MovementsComponent
    },
    {
        path: 'details', component: DetailsComponent
    }
]