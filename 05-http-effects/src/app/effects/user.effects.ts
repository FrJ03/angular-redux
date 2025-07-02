import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { UserService } from "../services/user.service";
import { User } from "../models/user.model";
import { loadUser, loadUserError, loadUserSuccess } from "../actions/user.actions";

@Injectable()
export class UserEffects{
    actions$ = inject(Actions)
    userService = inject(UserService)

    loadUsers$ = createEffect(
        () => this.actions$.pipe(
            ofType(loadUser),
            mergeMap(
                ({id}) => this.userService.getUser(id)
                    .pipe(
                        map(user => loadUserSuccess({user: user as User})),
                        catchError(err => of(loadUserError({payload: err})))
                    )
            )
        )
    )
}