import {createAction, props} from '@ngrx/store'

export const create = createAction(
    '[TODO] Crear todo',
    props<{texto: string}>()
)

export const toggle = createAction(
    '[TODO] Toggle todo',
    props<{id: number}>()
)

export const edit = createAction(
    '[TODO] Editar todo',
    props<{id: number, text: string}>()
)

export const deleteTodo = createAction(
    '[TODO] Eliminar todo',
    props<{id: number}>()
)

export const toggleAll = createAction(
    '[TODO] Toggle all todos',
    props<{completado: boolean}>()
)

export const deleteCompleted = createAction(
    '[TODO] Delete all completed todos'
)