import actions from "../constants/actions"

const initialState = {
    data: {},
    game: [],
    headerSet: [],
    activeSet: 0,
    endGame: { status: false },
    result: null,
    winningScore: 99
}

const board = (state=initialState, action) => {
    switch(action.type) {
        case actions.ADD_POINT: return {
            ...state,
            game: action.payload.game,
            activeSet: action.payload.activeSet,
            endGame: action.payload.endGame
        }
        case actions.SET_DATA: return {
            ...state,
            data: action.payload.data,
            headerSet: action.payload.headerSet,
            game: action.payload.game,
            winningScore: action.payload.winningScore
        }
        case actions.SET_RESULT: return {
            ...state,
            result: action.payload
        }
        default: return state
    }
}

export default board