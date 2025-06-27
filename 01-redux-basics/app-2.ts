import { decrementadorAction, dividirAction, incrementadorAction, multiplicarAction, resetAction } from "./actions/counter.action";
import { counterReducer } from "./reducers/counter.reducer";

console.log(counterReducer(10, incrementadorAction))

console.log(counterReducer(10, decrementadorAction))

console.log(counterReducer(10, multiplicarAction))

console.log(counterReducer(10, dividirAction))

console.log(counterReducer(10, resetAction))