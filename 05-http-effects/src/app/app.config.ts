import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideStoreDevtools} from '@ngrx/store-devtools'

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { appReducers } from './reducers/app.reducers';
import { provideEffects } from '@ngrx/effects';
import { EffectArray } from './effects';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(appReducers),
    provideStoreDevtools({
      maxAge: 25
    }),
    provideEffects(EffectArray),
    provideHttpClient()
  ]
};
