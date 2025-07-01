import { ActionReducer, createReducer, on, Action } from "@ngrx/store";
import { IngresoEgreso } from "../models/ingreso-egreso.model";
import { setItems, unsetItems } from "../actions/ingreso-egreso.actions";

export interface State {
    items: IngresoEgreso[]
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