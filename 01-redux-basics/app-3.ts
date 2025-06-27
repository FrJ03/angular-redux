import { Action } from "./actions/action";
import { counterReducer } from "./reducers/counter.reducer";
import { Reducer } from "./reducers/reducer";

class Store<T> {
    constructor(private reducer: Reducer<T>, private state: T){}

    getState(): T {
        return this.state
    }

    dispatch(action: Action) {
        this.state = this.reducer(this.state, action)
    }
}

const store = new Store(counterReducer, 0)

console.log(store.getState())