import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { logoutUser, logoutUserError, logoutUserSuccess, logUser, logUserError, logUserSuccess, saveUser, saveUserError, saveUserSuccess } from "../actions/user.actions";
import { catchError, map, merge, mergeMap, of } from "rxjs";
import { AuthService } from "../services/auth.service";
import { toObservable } from '@angular/core/rxjs-interop'

@Injectable()
export class UserEffect {
    actions = inject(Actions)
    authService = inject(AuthService)
    registration$ = toObservable(this.authService.registrationSignal)
    login$ = toObservable(this.authService.getUserSignal)
    logout$ = toObservable(this.authService.logoutSignal)
    
    saveUser$ = createEffect(
        () => this.actions.pipe(
            ofType(saveUser),
            mergeMap(
                ({user}) => {
                    this.authService.createUser(user)
                    
                    return this.registration$
                        .pipe(
                            map(result => result?.success 
                                ? saveUserSuccess({user})
                                : saveUserError({payload: result?.message})
                            ),
                            catchError(err => of(saveUserError({payload: err})))
                        )
                }  
            )
        )
    )

    getUser$ = createEffect(
        () => this.actions.pipe(
            ofType(logUser),
            mergeMap(
                ({email, password}) => {
                    this.authService.loginUser(email, password)

                    return this.login$.pipe(
                        map(response => response && response.user && response.result?.success
                            ? logUserSuccess({user: response.user})
                            : logUserError({payload: response?.result?.message ?? 'Login Error'})
                        ),
                        catchError(err => of(logUserError({payload: err})))
                    )
                }
            )
        )
    )

    logoutUser$ = createEffect(
        () => this.actions.pipe(
            ofType(logoutUser),
            mergeMap(
                () => {
                    this.authService.logout()
                    return this.logout$.pipe(
                        map(result => result?.success
                            ? logoutUserSuccess()
                            : logoutUserError({payload: result?.message ?? 'Unexpected error'})
                        ),
                        catchError(err => of(logoutUserError({payload: err})))
                    )
                }
            )
        )
    )
}