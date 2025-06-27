import { createReducer, on } from "@ngrx/store";
import { decrement, divide, increment, product } from "../actions/contador.actions";

const initialState = 0

const _contadorReducer = createReducer(
    initialState,
    on(increment, state => state + 1),
    on(decrement, state => state - 1),
    on(product, (state, {numero}) => state * numero),
    on(divide, (state, {numero}) => (numero === 0)
        ? state
        : state / numero
    )
)

export const contadorReducer = (state: any, action: any) => 
    _contadorReducer(state, action)