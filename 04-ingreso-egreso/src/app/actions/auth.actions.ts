import { createAction, props } from "@ngrx/store";
import { User } from "../models/user.model";

export const setUser = createAction(
    '[Auth] set current user',
    props<{user: User}>()
)

export const unsetUser = createAction(
    '[Auth] unset current user'
)