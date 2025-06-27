import { Action } from "./action"
import { ActionType } from "./counter.type"

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

const resetAction: Action = {
    type: ActionType.RESET,
}

export {
    incrementadorAction,
    decrementadorAction,
    multiplicarAction,
    dividirAction,
    resetAction
}