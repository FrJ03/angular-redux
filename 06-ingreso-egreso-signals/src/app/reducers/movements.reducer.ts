import { ActionReducer, createReducer, on } from "@ngrx/store";
import { Movement } from "../models/movement.model";
import { addMovement, addMovementError, addMovementSuccess, getMovements, getMovementsError, getMovementsSuccess } from "../actions/movements.actions";

export interface MovementsState {
    movements: Movement[],
    loading: boolean,
    error: any
}

export const initailState: MovementsState = {
    movements: [],
    loading: false,
    error: null
}

const _movementsReducer = createReducer(
    initailState,
    on(getMovements, state => ({
        ...state,
        loading: true,
        error: null
    })),
    on(getMovementsSuccess, (state, {movements}) => ({
        ...state,
        movements,
        loading: false
    })),
    on(getMovementsError, (state, {payload}) => ({
        ...state,
        loading: false,
        error: payload
    })),
    on(addMovement, state => ({
        ...state,
        loading: true,
        error: null
    })),
    on(addMovementSuccess, (state, {movement}) => ({
        ...state,
        movements: [
            ...state.movements,
            movement
        ],
        loading: false
    })),
    on(addMovementError, (state, {payload}) => ({
        ...state,
        loading: false,
        error: payload
    }))
)

export const movementsReducer: ActionReducer<MovementsState> = (state, action) => 
    _movementsReducer(state, action)