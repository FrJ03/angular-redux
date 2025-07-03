import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { saveUser, saveUserError, saveUserSuccess } from "../actions/user.actions";
import { catchError, map, mergeMap, of } from "rxjs";
import { AuthService } from "../services/auth.service";
import { toObservable } from '@angular/core/rxjs-interop'

@Injectable()
export class UserEffect {
    actions = inject(Actions)
    authService = inject(AuthService)
    registration$ = toObservable(this.authService.registrationSignal)
    
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
}