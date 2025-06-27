import { createAction, props } from '@ngrx/store'

export const increment = createAction('[Contador] Incrementar')
export const decrement = createAction('[Contador] Decrementar')
export const product = createAction(
    '[Contador] Multiplicar',
    props<{numero: number}>()
)
export const divide = createAction(
    '[Contador] Dividir', 
    props<{numero: number}>()
)