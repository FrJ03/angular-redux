import { Action, ActionReducer, createReducer, on } from "@ngrx/store";
import { User } from "../models/user.model";
import { setUser, unsetUser } from "../actions/auth.actions";

export interface State {
    user: User | null
}

export const initialState: State = {
    user: null
}

const _authReducer = createReducer(
    initialState,
    on(setUser, (state, {user}) => ({
        ...state,
        user: user
    })),
    on(unsetUser, state => ({
        ...state,
        user: null
    }))
)

export const authReducer: ActionReducer<State, Action<string>> = (state, action) => 
    _authReducer(state, action)