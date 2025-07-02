import { Action, ActionReducer, createReducer, on } from "@ngrx/store";
import { User } from "../models/user.model";
import { loadUser, loadUserError, loadUserSuccess } from "../actions/user.actions";

export interface UserState {
    id: string | null,
    user: User | null,
    loaded: boolean,
    loading: boolean,
    error: any
}

export const initialState: UserState = {
    id: null,
    user: null,
    loaded: false,
    loading: false,
    error: null
}

const _userReducer = createReducer(
    initialState,
    on(loadUser, (state, {id}) => ({
        ...state,
        loading: true,
        id: id
    })),
    on(loadUserSuccess, (state, {user}) => ({
        ...state,
        loading: false,
        loaded: true,
        user: {...user}
    })),
    on(loadUserError, (state, {payload}) => ({
        ...state,
        loading: false,
        loaded: false,
        error: payload
    }))
)

export const userReducer: ActionReducer<UserState, Action<string>> = (state, action) => 
    _userReducer(state, action)