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
    type: ActionType.DECREMENTAR,
    payload: 2
}

const dividirAction: Action = {
    type: ActionType.DECREMENTAR,
    payload: 2
}

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

        default:
            return state
    }
}
