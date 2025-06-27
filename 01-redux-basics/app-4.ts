import { legacy_createStore, Store } from "redux";
import { counterReducer } from "./reducers/counter.reducer";
import { incrementadorAction } from "./actions/counter.action";

const store: Store = legacy_createStore(counterReducer, 10)

store.subscribe(() => console.log(`Subs: ${store.getState()}`))

store.dispatch(incrementadorAction)