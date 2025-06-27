import { ActionType } from "../actions/counter.type"

const reducer = (state = 10, action: Action) => {
    switch (action.type) {
        case ActionType.INCREMENTAR: 
            return state++

        case ActionType.DECREMENTAR: 
            return state--

        case ActionType.MULTIPLICAR:
            return state * action.payload

        case ActionType.DIVIDIR:
            return (action.payload === 0) 
                ? state 
                : state / action.payload
        
        case ActionType.RESET:
            return state = 0

        default:
            return state
    }
}

export { reducer }