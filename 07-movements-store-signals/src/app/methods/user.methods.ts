import { User } from "../models/user.model"
import { patchState, WritableStateSource } from "@ngrx/signals"
import { AuthService } from "../services/auth.service"

export const saveUser = async (
        store: WritableStateSource<object>,
        user: User,
        authService: AuthService
    ): Promise<void> => {
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
}

export const logUser = async (
        store: WritableStateSource<object>,
        email: string,
        password: string,
        authService: AuthService
    ): Promise<void> => {
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
}

export const checkLogged = async (
        store: WritableStateSource<object>,
        authService: AuthService
    ): Promise<void> => {
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
}

export const logout = async (
        store: WritableStateSource<object>,
        authService: AuthService
    ): Promise<void> => {
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