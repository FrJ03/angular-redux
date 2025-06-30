import { createAction, props } from "@ngrx/store";

export type Filter = 'todos' |'completados' | 'activos';

export const setFilter = createAction(
    '[Filtro] Set Filtro',
    props<{filter: Filter}>()
)