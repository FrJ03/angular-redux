import { ActionReducerMap } from "@ngrx/store";
import { usersReducer, UsersState } from "./users.reducer";

export interface AppState {
    users: UsersState
}

export const appReducers: ActionReducerMap<AppState> = {
    users: usersReducer
}