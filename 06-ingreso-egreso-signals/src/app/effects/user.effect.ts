import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { checkLogged, checkLoggedError, checkLoggedSuccess, logoutUser, logoutUserError, logoutUserSuccess, logUser, logUserError, logUserSuccess, saveUser, saveUserError, saveUserSuccess } from "../actions/user.actions";
import { mergeMap, of } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable()
export class UserEffect {
    actions = inject(Actions)
    authService = inject(AuthService)
    
    saveUser$ = createEffect(
        () => this.actions.pipe(
            ofType(saveUser),
            mergeMap(
                ({user}) => {
                    const result = this.authService.createUser(user)

                    return result.success
                        ? of(saveUserSuccess({user}))
                        : of(saveUserError({payload: result.message}))
                }
            )
        )
    )

    getUser$ = createEffect(
        () => this.actions.pipe(
            ofType(logUser),
            mergeMap(
                ({email, password}) => {
                    const result = this.authService.loginUser(email, password)

                    return result.user && result.result?.success
                        ? of(logUserSuccess({user: result.user}))
                        : of(logUserError({payload: result.result?.message ?? 'Login Error'}))
                }
            )
        )
    )

    logoutUser$ = createEffect(
        () => this.actions.pipe(
            ofType(logoutUser),
            mergeMap(
                () => {
                    const result = this.authService.logout()
                    return result.success
                        ? of(logoutUserSuccess())
                        : of(logoutUserError({payload: result.message}))
                }
            )
        )
    )

    checkLogged$ = createEffect(
        () => this.actions.pipe(
            ofType(checkLogged),
            mergeMap(
                () => {
                    const result = this.authService.checkLogged()

                    if(!result.success){
                        return of(checkLoggedError({payload: result?.message}) )
                    }

                    if(result.logged && result.user){
                        this.authService.loginUser(result.user.email, result.user.password)
                    }

                    return of(checkLoggedSuccess({logged: result.logged, user: result.user}))
                }
            )
        )
    )
}