import { createSelector } from "@ngrx/store";
import { AppState } from "../reducers/app.reducer";
import { Movement } from "../models/movement.model";

export const selectMovements = createSelector(
    (state: AppState) => state.movements.movements,
    (movements: Movement[]) => movements
)

export const selectLoading = createSelector(
    (state: AppState) => state.movements.loading,
    (loading: boolean) => loading
)

export const selectError = createSelector(
    (state: AppState) => state.movements.error,
    (error: any) => error
)