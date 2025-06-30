import { Action, createReducer, on } from "@ngrx/store";
import { Filter, setFilter } from "../actions/filter.actions";

export const initialState: Filter = 'todos';

const _filterReducer = createReducer<Filter, Action>(
    initialState,
    on(setFilter, (state, { filter }) => filter)
);


export const filterReducer = (state: Filter | undefined, action: Action): Filter => 
    _filterReducer(state, action)