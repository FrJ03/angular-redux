import { createAction, props } from "@ngrx/store";
import { Movement } from "../models/movement.model";

export const getMovements = createAction(
    '[Movements] Get Movements By Email',
    props<{email: string}>()
)

export const getMovementsSuccess = createAction(
    '[Movements] Get Movements By Email Success',
    props<{movements: Movement[]}>()
)

export const getMovementsError = createAction(
    '[Movements] Get Movements By Email Error',
    props<{payload: any}>()
)

export const addMovement = createAction(
    '[Movements] Add Movement',
    props<{movement: Movement}>()
)

export const addMovementSuccess = createAction(
    '[Movements] Add Movement Success',
    props<{movement: Movement}>()
)

export const addMovementError = createAction(
    '[Movements] Add Movement Error',
    props<{payload: any}>()
)

export const deleteMovement = createAction(
    '[Movements] Delete Movement',
    props<{uid: string}>()
)

export const deleteMovementSuccess = createAction(
    '[Movements] Delete Movement Success',
    props<{movements: Movement[]}>()
)

export const deleteMovementError = createAction(
    '[Movements] Delete Movement Error',
    props<{payload: any}>()
)