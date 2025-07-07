import { createSelector } from "@ngrx/store";
import { AppState } from "../reducers/app.reducer";
import { User } from "../models/user.model";
import { UserState } from "../reducers/user.reducer";

export const selectUser = createSelector(
    (state: AppState) => state.user.user,
    (user: User | null) => user
)

export const selectLoading = createSelector(
    (state: AppState) => state.user.loading,
    (loading: boolean) => loading
)

export const selectError = createSelector(
    (state: AppState) => state.user.error,
    (error: any) => error
)