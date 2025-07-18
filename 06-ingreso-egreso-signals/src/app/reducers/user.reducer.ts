import { ActionReducer, createReducer, on } from "@ngrx/store";
import { User } from "../models/user.model";
import { checkLogged, checkLoggedError, checkLoggedSuccess, logoutUser, logoutUserError, logoutUserSuccess, logUser, logUserError, logUserSuccess, saveUser, saveUserError, saveUserSuccess } from "../actions/user.actions";

export interface UserState {
    user: User | null,
    loading: boolean,
    error: any
}

export const initialState: UserState = {
    user: null,
    loading: false,
    error: null
}

const _userReducer: ActionReducer<UserState> = createReducer(
    initialState,
    on(saveUser, state => ({
        ...state,
        loading: true,
        error: null
    })),
    on(saveUserSuccess, (state, {user}) => ({
        ...state,
        loading: false,
        user: user
    })),
    on(saveUserError, (state, {payload}) => ({
        ...state,
        user: null,
        error: payload,
        loading: false
    })),
    on(logUser, state => ({
        ...state,
        loading: true,
        error: null
    })),
    on(logUserSuccess, (state, {user}) => ({
        ...state,
        user: user,
        loading: false
    })),
    on(logUserError, (state, {payload}) => ({
        ...state,
        user: null,
        loading: false,
        error: payload
    })),
    on(logoutUser, state => ({
        ...state,
        loading: true,
        error: null
    })),
    on(logoutUserSuccess, state => ({
        ...state,
        user: null,
        loading: false
    })),
    on(logoutUserError, (state, {payload}) => ({
        ...state,
        loading: false,
        error: payload
    })),
    on(checkLogged, state => ({
        ...state,
        loading: true,
        error: null
    })),
    on(checkLoggedSuccess, (state, {user}) => ({
        ...state,
        loading: false,
        user: user
    })),
    on(checkLoggedError, (state, {payload}) => ({
        ...state,
        loading: false,
        error: payload
    }))
)

export const userReducer: ActionReducer<UserState> = (state, action) => 
    _userReducer(state, action)