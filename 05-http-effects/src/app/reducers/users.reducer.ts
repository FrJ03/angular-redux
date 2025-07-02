import { Action, ActionReducer, createReducer, on } from "@ngrx/store";
import { User } from "../models/user.model";
import { loadUsers, loadUsersError, loadUsersSuccess } from "../actions/users.actions";

export interface UsersState {
    users: User[],
    loaded: boolean,
    loading: boolean,
    error: any
}

export const initialState: UsersState = {
    users: [],
    loaded: false,
    loading: false,
    error: null
}

const _usersReducer = createReducer(
    initialState,
    on(loadUsers, state => ({
        ...state,
        loading: true
    })),
    on(loadUsersSuccess, (state, {users}) => ({
        ...state,
        loading: false,
        loaded: true,
        users: [...users]
    })),
    on(loadUsersError, (state, {payload}) => ({
        ...state,
        loading: false,
        loaded: false,
        error: payload
    }))
)

export const usersReducer: ActionReducer<UsersState, Action<string>> = (state, action) => 
    _usersReducer(state, action)