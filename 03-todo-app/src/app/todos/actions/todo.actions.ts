import {createAction, props} from '@ngrx/store'

export const create = createAction(
    '[TODO] Crear todo',
    props<{texto: string}>()
)