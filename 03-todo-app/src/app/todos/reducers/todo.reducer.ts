import { createReducer, on } from "@ngrx/store";
import { create } from "../actions/todo.actions";
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
    ])
)

export const todoReducer = (state: any, action: any) => {
    return _todoReducer(state, action)
}