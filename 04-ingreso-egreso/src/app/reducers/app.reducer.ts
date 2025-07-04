import { ActionReducerMap } from "@ngrx/store";
import * as ui from './ui.reducer'
import * as auth from './auth.reducer'

export interface AppState {
    ui: ui.State,
    user: auth.State,
    //ingresosEgresos: ingresoEgreso.State
}

export const appReducers: ActionReducerMap<AppState> = {
    ui: ui.uiReducer,
    user: auth.authReducer,
    //ingresosEgresos: ingresoEgreso.ingresoEgresoReducer
}