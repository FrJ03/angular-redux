import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {appReducers} from './reducers/app.reducer'
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {provideCharts, withDefaultRegisterables,} from 'ng2-charts'
import { AuthModule } from './auth/auth.module';
import { IngresoEgresoModule } from './ingreso-egreso/ingreso-egreso.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AuthModule,
    CommonModule,
    SharedModule,
    FormsModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    })
  ],
  providers: [provideCharts(withDefaultRegisterables())],
  bootstrap: [AppComponent]
})
export class AppModule { }
