import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {provideStoreDevtools} from '@ngrx/store-devtools'
import { provideStore } from '@ngrx/store';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { MovementsStore } from './stores/movements.store';
import { UserStore } from './stores/user.store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    MovementsStore,
    UserStore,
    provideStoreDevtools({
      maxAge: 25
    }),
    provideCharts(withDefaultRegisterables())
  ]
};
