const ActionType = {
    INCREMENTAR: 'INCREMENTAR',
    DECREMENTAR: 'DECREMENTAR',
    MULTIPLICAR: 'MULTIPLICAR',
    DIVIDIR: 'DIVIDIR'
}

interface Action {
    type: string;
    payload?: any;
}

const incrementadorAction: Action = {
    type: ActionType.INCREMENTAR
}

const decrementadorAction: Action = {
    type: ActionType.DECREMENTAR
}

const multiplicarAction: Action = {
    type: ActionType.MULTIPLICAR,
    payload: 2
}

const dividirAction: Action = {
    type: ActionType.DIVIDIR,
    payload: 2
}

const reducer = (state = 10, action: Action) => {
    switch (action.type) {
        case ActionType.INCREMENTAR: 
            return state += 1

        case ActionType.DECREMENTAR: 
            return state -= 1

        case ActionType.MULTIPLICAR:
            return state = state * action.payload

        case ActionType.DIVIDIR:
            return (action.payload === 0) 
                ? state 
                : state = state /action.payload

        default:
            return state
    }
}

console.log(reducer(10, incrementadorAction))

console.log(reducer(10, decrementadorAction))

console.log(reducer(10, multiplicarAction))

console.log(reducer(10, dividirAction))
