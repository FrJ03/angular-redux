import { inject } from "@angular/core"
import { patchState, signalStore, withMethods, withProps, withState } from "@ngrx/signals"
import { AuthService } from "../services/auth.service"
import { User } from "../models/user.model"
import { on, withEffects, withReducer } from "@ngrx/signals/events"
import { checkLogged, logUser, saveUser } from "../events/user.events"
import { userEffect } from "../effects/user.effect"

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

export const UserStore = signalStore(
    {providedIn: 'root'},
    withState(initialState),
    withProps(store => ({
        store,
        authService: inject(AuthService)
    })),
    withMethods(({store, authService}) => {
        return {
            logout: async () => {
                patchState(store, state => ({
                    ...state,
                    loading: true,
                    error: null
                }))
                const result = await authService.logout()

                if(result.success) {
                    patchState(store, state => ({
                        ...state,
                        loading: false,
                        user: null
                    }))
                } else {
                    patchState(store, state => ({
                        ...state,
                        loading: false,
                        error: result.message
                    }))
                }
            }
        }
    }),
    withReducer(
        on(saveUser.init, (event, state) => ({
            ...state,
            loading: true,
            error: null
        })),
        on(saveUser.success, (event, state) => ({
            ...state,
            loading: false,
            user: event.payload.user
        })),
        on(saveUser.error, (event, state) => ({
            ...state,
            loading: false,
            error: event.payload.error
        })),
        on(logUser.init, (event, state) => ({
            ...state,
            loading: true,
            error: null
        })),
        on(logUser.success, (event, state) => ({
            ...state,
            loading: false,
            user: event.payload.user
        })),
        on(logUser.error, (event, state) => ({
            ...state,
            loading: false,
            error: event.payload.error
        })),
        on(checkLogged.init, (event, state) => ({
            ...state,
            loading: true,
            error: null
        })),
        on(checkLogged.success, (event, state) => ({
            ...state,
            loading: false,
            user: event.payload.user
        })),
        on(checkLogged.error, (event, state) => ({
            ...state,
            loading: false,
            error: event.payload.error
        }))
    ),
    withEffects(
        userEffect
    )
)