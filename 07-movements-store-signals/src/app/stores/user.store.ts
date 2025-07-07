import { inject } from "@angular/core"
import { signalStore, withMethods, withState, patchState } from "@ngrx/signals"
import { AuthService } from "../services/auth.service"
import { User } from "../models/user.model"
import { checkLogged, logout, logUser, saveUser } from "../methods/user.methods"

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
    withMethods(store => {
        const authService = inject(AuthService)
        return {
            saveUser: (user: User) => saveUser(store, user, authService),
            logUser: (email: string, password: string) => 
                logUser(store, email, password, authService),
            checkLogged: () => checkLogged(store, authService),
            logout: () => logout(store, authService)
        }
    })
)