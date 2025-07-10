import { type } from "@ngrx/signals";
import { eventGroup } from "@ngrx/signals/events";
import { Movement } from "../models/movement.model";

export const loadMovements = eventGroup({
    source: '[Movements] load movements',
    events: {
        init: type<{email: string}>(),
        success: type<{movements: Movement[]}>(),
        error: type<{error: any}>()
    }
})