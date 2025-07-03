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