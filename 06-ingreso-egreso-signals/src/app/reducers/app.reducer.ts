import { ActionReducerMap } from "@ngrx/store"
import { userReducer, UserState } from "./user.reducer"

export interface AppState {
    user: UserState
}

export const appReducer: ActionReducerMap<AppState> = {
    user: userReducer
}