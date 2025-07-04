import { ActionReducerMap } from "@ngrx/store"
import { userReducer, UserState } from "./user.reducer"
import { movementsReducer, MovementsState } from "./movements.reducer"

export interface AppState {
    user: UserState,
    movements: MovementsState
}

export const appReducer: ActionReducerMap<AppState> = {
    user: userReducer,
    movements: movementsReducer
}