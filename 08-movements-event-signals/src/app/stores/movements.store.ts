import { Movement } from "../models/movement.model";
import { patchState, signalStore, withMethods, withProps, withState } from "@ngrx/signals";
import { MovementsService } from "../services/movements.service";
import { inject } from "@angular/core";
import { on, withEffects, withReducer } from "@ngrx/signals/events";
import { loadMovements } from "../events/movements.events";
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
  withMethods(({store, movementsService}) => ({
      async createMovement(movement: Movement): Promise<void> {
        patchState(store, state => ({
          ...state,
          loading: true,
          error: null
        }))

        const result = await movementsService.createMovement(movement)

        if(result.success){
          patchState(store, state => ({
            ...state,
            loading: false,
            movements: [
              ...state.movements,
              movement
            ]
          }))
        } else {
          patchState(store, state => ({
            ...state,
            loading: false,
            error: result.message
          }))
        }
      },
      async deleteMovement(id: string): Promise<void> {
        patchState(store, state => ({
          ...state,
          loading: true,
          error: null
        }))

        const result = await movementsService.deleteItem(id)

        if(result.success && result.deletedMovement) {
          const newMovements = store.movements()
            .filter(movement => 
              movement.uid !== result.deletedMovement?.uid)
  
          patchState(store, state => ({
            ...state,
            movements: [...newMovements],
            loading: false
          }))
        } else {
          patchState(store, state => ({
            ...state,
            loading: false,
            error: result.message
          }))
        }

      }
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
    }))
  ),
  withEffects(
    movementsEffect
  )
);

