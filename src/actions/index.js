import actions from "../constants/actions"

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

export const addGame = (game) => ({
    type: actions.ADD_GAME,
    payload: game
})

export const changeWinnigScore = (score) => ({
    type: actions.SET_SCORE,
    payload: score
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