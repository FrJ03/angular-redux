import { Movement } from "../models/movement.model";
import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { MovementsService } from "../services/movements.service";
import { inject } from "@angular/core";

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
  withMethods((store) => {
    const movementsService = inject(MovementsService); // ✅ valid injection context

    return {
      async loadMovements(email: string): Promise<void> {
        patchState(store, (state) => ({
          ...state,
          loading: true,
          error: null
        }));

        const movementsResult = await movementsService.getMovementsByEmail(email);

        if (movementsResult.success) {
          patchState(store, (state) => ({
            ...state,
            loading: false,
            movements: movementsResult.movements
          }));
        } else {
          patchState(store, (state) => ({
            ...state,
            loading: false,
            error: movementsResult.message
          }));
        }
      },
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
    };
  })
);

