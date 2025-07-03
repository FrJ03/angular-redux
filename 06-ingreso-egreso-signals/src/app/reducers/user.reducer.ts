import { ActionReducer, createReducer, on } from "@ngrx/store";
import { User } from "../models/user.model";
import { saveUser, saveUserError, saveUserSuccess } from "../actions/user.actions";

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
        loading: true
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
    }))
)

export const userReducer: ActionReducer<UserState> = (state, action) => 
    _userReducer(state, action)