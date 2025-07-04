import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {provideStoreDevtools} from '@ngrx/store-devtools'
import { provideStore } from '@ngrx/store';
import { appReducer } from './reducers/app.reducer';
import { provideEffects } from '@ngrx/effects';
import { UserEffect } from './effects/user.effect';
import { MovementsEffect } from './effects/movements.effect';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(appReducer),
    provideEffects([
      UserEffect,
      MovementsEffect
    ]),
    provideStoreDevtools({
      maxAge: 25
    }),
  ]
};
