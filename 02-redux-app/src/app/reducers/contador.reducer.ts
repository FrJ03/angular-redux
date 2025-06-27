import { createReducer, on } from "@ngrx/store";
import { decrement, increment } from "../actions/contador.actions";

const initialState = 0

const _contadorReducer = createReducer(
    initialState,
    on(increment, state => state + 1),
    on(decrement, state => state - 1)
)

export const contadorReducer = (state: any, action: any) => 
    _contadorReducer(state, action)