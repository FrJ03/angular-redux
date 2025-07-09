import { type } from "@ngrx/signals"
import { eventGroup } from "@ngrx/signals/events"
import { User } from "../models/user.model"

export const saveUser = eventGroup({
    source: '[User] save user',
    events: {
        init: type<{user: User}>(),
        success: type<{user: User}>(),
        error: type<{error: any}>()
    }
})

export const logUser = eventGroup({
    source: '[User] log user',
    events: {
        init: type<{email: string, password: string}>(),
        success: type<{user: User}>(),
        error: type<{error: any}>()
    }
})