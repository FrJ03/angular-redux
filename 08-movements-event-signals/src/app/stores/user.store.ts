import { inject } from "@angular/core"
import { patchState, signalStore, withMethods, withProps, withState } from "@ngrx/signals"
import { AuthService } from "../services/auth.service"
import { User } from "../models/user.model"

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
            saveUser: async (user: User) => {
                patchState(store, state => ({
                    ...state,
                    loading: true,
                    error: null
                }))
        
                const result = await authService.createUser(user)
        
                if(result.success){
                    const logResult = await authService.loginUser(
                        user.email,
                        user.password
                    )
        
                    if(logResult.result?.success) {
                        patchState(store, state => ({
                            ...state,
                            loading: false,
                            user: user
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
            logUser: async (email: string, password: string) => {
                patchState(store, state => ({
                    ...state,
                    loading: true,
                    error: null
                }))

                const result = await authService.loginUser(email, password)

                if(result.result?.success && result.user){
                    patchState(store, state => ({
                        ...state,
                        loading: false,
                        user: result.user
                    }))
                } else {
                    patchState(store, state => ({
                        ...state,
                        loading: false,
                        error: result.result?.message ?? 'Loading error'
                    }))
                }
            },
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
    })
)