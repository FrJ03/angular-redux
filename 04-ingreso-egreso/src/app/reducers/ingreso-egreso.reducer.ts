import { ActionReducer, createReducer, on, Action } from "@ngrx/store";
import { IngresoEgreso } from "../models/ingreso-egreso.model";
import { setItems, unsetItems } from "../actions/ingreso-egreso.actions";
import { AppState } from "./app.reducer";

export interface State {
    items: IngresoEgreso[]
}

export interface AppStateWithIngreso extends AppState {
    ingresosEgresos: State
}

export const initialState: State = {
    items: []
}

const _ingresoEgresoReducer = createReducer(
    initialState,
    on(setItems, (state, {items}) => ({
        ...state,
        items: items
    })),
    on(unsetItems, (state) => ({
        ...state,
        items: []
    }))
)

export const ingresoEgresoReducer: ActionReducer<State, Action<string>> = (state, action) => 
    _ingresoEgresoReducer(state, action)