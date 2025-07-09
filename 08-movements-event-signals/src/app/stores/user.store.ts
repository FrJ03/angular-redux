import { inject } from "@angular/core"
import { patchState, signalStore, withMethods, withProps, withState } from "@ngrx/signals"
import { AuthService } from "../services/auth.service"
import { User } from "../models/user.model"
import { on, withEffects, withReducer } from "@ngrx/signals/events"
import { logUser, saveUser } from "../events/user.events"
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
            checkLogged: async () => {
                patchState(store, state => ({
                    ...state,
                    loading: true,
                    error: null
                }))
                
                const result = await authService.checkLogged()

                if(result.success && result.user) {
                    const logResult = await authService.loginUser(
                        result.user.email,
                        result.user.password
                    )

                    if(logResult.result?.success) {
                        patchState(store, state => ({
                            ...state,
                            loading: false,
                            user: result.user
                        }))
                    } else {
                        patchState(store, state => ({
                            ...state,
                            loading: false,
                            error: logResult.result?.message ?? 'Login error'
                        }))
                    }
                } else {
                    patchState(store, state => ({
                        ...state,
                        loading: false,
                        error: result.message
                    }))
                }
            },
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
        }))
    ),
    withEffects(
        userEffect
    )
)