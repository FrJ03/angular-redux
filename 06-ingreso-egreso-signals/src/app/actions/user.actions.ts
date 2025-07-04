import { createAction, props } from "@ngrx/store";
import { User } from "../models/user.model";

export const saveUser = createAction(
    '[User] Save User',
    props<{user: User}>()
)

export const saveUserSuccess = createAction(
    '[User] Save User Success',
    props<{user: User}>()
)

export const saveUserError = createAction(
    '[User] Save User Error',
    props<{payload: any}>()
)

export const logUser = createAction(
    '[User] Get User',
    props<{email: string, password: string}>()
)

export const logUserSuccess = createAction(
    '[User] Get User Success',
    props<{user: User}>()
)

export const logUserError = createAction(
    '[User] Get User Error',
    props<{payload: any}>()
)

export const logoutUser = createAction(
    '[User] Logout User'
)

export const logoutUserSuccess = createAction(
    '[User] Logout User Success'
)

export const logoutUserError = createAction(
    '[User] Logout User Error',
    props<{payload: any}>()
)