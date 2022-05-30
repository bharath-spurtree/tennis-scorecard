import actions from "../constants/actions"
import { addPoint, setResultMethod } from "../utils/gameBoard"

export const changeData = (data) => {
    return (dispatch) => {
        let setArray = []
        let set = []
        for (let i = 0; i < data.set; i++) {
            setArray.push(0)
            set.push(i + 1)
        }
        let game = data.players.map((player) => {
            return { player, sets: setArray, currentSet: 0 }
        })
        let score = ((parseInt(data.set) + 1) / 2) * 6
        dispatch({
            type: actions.SET_DATA,
            payload: { data, headerSet: set, game, winningScore: score }
        })
    }
}

export const addPointAction = (scoredPlayerIndex) => async (dispatch, getState) => {
    const state = getState()
    const { game, data, activeSet, winningScore } = state.board
    const response = await addPoint(scoredPlayerIndex, game, data, activeSet, winningScore)
    dispatch({
        type: actions.ADD_POINT,
        payload: response
    })
}

export const setResult = () => (dispatch, getState) => {
    const state = getState()
    const { game, endGame, data } = state.board
    const result = setResultMethod(game, endGame, data)
    dispatch({
        type: actions.SET_RESULT,
        payload: result
    })
}