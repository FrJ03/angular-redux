import { createReducer, on } from "@ngrx/store";
import { create, deleteTodo, edit, toggle, toggleAll } from "../actions/todo.actions";
import { Todo } from "../models/todo.model";

export const initialState: Todo[] = []

const _todoReducer = createReducer(
    initialState,
    on(create, (state, {texto}) => [
        ...state,
        new Todo(
            new Date().getTime(),
            texto,
            false
        )
    ]),
    on(toggle, (state, {id}) => {
        return state.map(todo => (todo.id === id)
            ? {
                ...todo,
                completado: !todo.completado
            }
            : todo
        )
    }),
    on(edit, (state, {id, text}) => {
        return state.map(todo => (todo.id === id)
            ? {
                ...todo,
                texto: text
            }
            : todo
        )
    }),
    on(deleteTodo, (state, {id}) => {
        return state.filter(todo => todo.id !== id)
    }),
    on(toggleAll, (state, {completado}) => {
        return state.map(todo => ({
            ...todo,
            completado: completado
        }))
    })
)

export const todoReducer = (state: any, action: any) => {
    return _todoReducer(state, action)
}