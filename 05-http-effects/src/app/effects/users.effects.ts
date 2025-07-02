import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { loadUsers, loadUsersError, loadUsersSuccess } from "../actions/users.actions";
import { catchError, map, mergeMap, of } from "rxjs";
import { UserService } from "../services/user.service";
import { User } from "../models/user.model";

@Injectable()
export class UsersEffects{
    actions$ = inject(Actions)
    userService = inject(UserService)

    loadUsers$ = createEffect(
        () => this.actions$.pipe(
            ofType(loadUsers),
            mergeMap(
                () => this.userService.getUsers()
                    .pipe(
                        map(users => loadUsersSuccess({users: users as User[]})),
                        catchError(err => of(loadUsersError({payload: err})))
                    )
            )
        )
    )
}