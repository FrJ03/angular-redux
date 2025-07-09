import { type } from "@ngrx/signals"
import { event, eventGroup } from "@ngrx/signals/events"
import { User } from "../models/user.model"

// export enum UserEvents {
//     SAVE_USER = '[User] save user',
//     SAVE_USER_SUCCESS = '[User] save user success',
//     SAVE_USER_ERROR = '[User] save user error'
// }

// export const init = event(
//     UserEvents.SAVE_USER,
//     type<{user: User}>()
// )

// export const saveUserSuccess = event(
//     UserEvents.SAVE_USER_SUCCESS,
//     type<{user: User}>()
// )

// export const saveUserError = event(
//     UserEvents.SAVE_USER_ERROR,
//     type<{error: any}>()
// )

export const saveUser = eventGroup({
    source: '[User] save user',
    events: {
        init: type<{user: User}>(),
        success: type<{user: User}>(),
        error: type<{error: any}>()
    }
})

