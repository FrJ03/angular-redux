import { ActionReducerMap } from "@ngrx/store";
import { usersReducer, UsersState } from "./users.reducer";
import { userReducer, UserState } from "./user.reducer";

export interface AppState {
    users: UsersState
    user: UserState
}

export const appReducers: ActionReducerMap<AppState> = {
    users: usersReducer,
    user: userReducer
}