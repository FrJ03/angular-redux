import {Action, ActionReducer, createReducer, on} from '@ngrx/store'
import { isLoading, stopLoading } from '../actions/ui.actions'

export interface State {
    isLoading: boolean
}

export const initialState: State = {
    isLoading: false
}

const _uiReducer = createReducer(
    initialState,
    on(isLoading, state => ({
        ...state,
        isLoading: true
    })),
    on(stopLoading, state => ({
        ...state,
        isLoading: false
    }))
)

export const uiReducer: ActionReducer<State, Action<string>> = (state, action) => 
    _uiReducer(state, action)