import { ActionReducerMap } from "@ngrx/store";
import { Filter } from "./actions/filter.actions";
import { Todo } from "./todos/models/todo.model";
import { todoReducer } from "./todos/reducers/todo.reducer";
import { filterReducer } from "./reducers/filter.reducer";

export interface AppState {
    todos: Todo[],
    filter: Filter
}

export const appReducer: ActionReducerMap<AppState> = {
    todos: todoReducer,
    filter: filterReducer
}