import { Routes } from "@angular/router";
import { MovementsComponent } from "./movements/movements.component";
import { DetailsComponent } from "./details/details.component";
import { StatsComponent } from "./stats/stats.component";

export const dashboardRoutes: Routes = [
    {
        path: 'movements', component: MovementsComponent
    },
    {
        path: 'details', component: DetailsComponent
    },
    {
        path: '', component: StatsComponent
    },
    {
        path: '**', redirectTo: ''
    }
]