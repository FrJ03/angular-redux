import { decrementadorAction, dividirAction, incrementadorAction, multiplicarAction, resetAction } from "./actions/counter.action";
import { reducer } from "./reducers/counter.reducer";

console.log(reducer(10, incrementadorAction))

console.log(reducer(10, decrementadorAction))

console.log(reducer(10, multiplicarAction))

console.log(reducer(10, dividirAction))

console.log(reducer(10, resetAction))