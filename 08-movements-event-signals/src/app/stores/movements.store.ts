import { Movement } from "../models/movement.model";
import { patchState, signalStore, withMethods, withProps, withState } from "@ngrx/signals";
import { MovementsService } from "../services/movements.service";
import { inject } from "@angular/core";
import { on, withEffects, withReducer } from "@ngrx/signals/events";
import { createMovement, deleteMovement, loadMovements } from "../events/movements.events";
import { movementsEffect } from "../effects/movements.effect";

export interface MovementsState {
    movements: Movement[],
    loading: boolean,
    error: any
}

const initialState: MovementsState = {
    movements: [],
    loading: false,
    error: null
}

export const MovementsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withProps(store => ({
    store,
    movementsService: inject(MovementsService)
  })),
  withReducer(
    on(loadMovements.init, (event, state) => ({
      ...state,
      loading: true,
      error: null
    })),
    on(loadMovements.success, ({payload}, state) => ({
      ...state,
      loading: false,
      movements: payload.movements
    })),
    on(loadMovements.error, ({payload}, state) => ({
      ...state,
      loading: false,
      error: payload
    })),
    on(createMovement.init, (event, state) => ({
      ...state,
      loading: true,
      error: null
    })),
    on(createMovement.success, ({payload}, state) => ({
      ...state,
      loading: false,
      movements: [
        ...state.movements,
        payload.movement
      ]
    })),
    on(createMovement.error, ({payload}, state) => ({
      ...state,
      loading: false,
      error: payload.error
    })),
    on(deleteMovement.init, (event, state) => ({
      ...state,
      loading: true,
      error: null
    })),
    on(deleteMovement.success, ({payload}, state) => ({
      ...state,
      loading: false,
      movements: [...payload.movements]
    })),
    on(deleteMovement.error, ({payload}, state) => ({
      ...state,
      loading: false,
      error: payload.error
    }))
  ),
  withEffects(
    movementsEffect
  )
);

