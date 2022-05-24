import actions from "../constants/actions"

export const addGame = (game) => ({
    type: actions.ADD_GAME,
    payload: game
})

export const changeWinnigScore = (score) => ({
    type: actions.SET_SCORE,
    payload: score
})

export const changeData = (data) => ({
    type: actions.SET_DATA,
    payload: data
})

export const changeHeader = (header) => ({
    type: actions.SET_HEADER,
    payload: header
})

export const changeActiveSet = (set) => ({
    type: actions.SET_ACTIVE_SET,
    payload: set
})

export const setEndGame = (end) => ({
    type: actions.SET_END_GAME,
    payload: end
})

export const setResult = (result) => ({
    type: actions.SET_RESULT,
    payload: result
})