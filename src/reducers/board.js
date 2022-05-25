import actions from "../constants/actions"

const initialState = {
    data: {},
    game: [],
    headerSet: [],
    activeSet: 0,
    endGame: {},
    result: null,
    winningScore: 99
}

const board = (state=initialState, action) => {
    switch(action.type) {
        case actions.ADD_GAME: return {
            ...state,
            game: action.payload
        }
        case actions.SET_SCORE: return {
            ...state,
            winningScore: action.payload
        }
        case actions.SET_DATA: return {
            ...state,
            data: action.payload
        }
        case actions.SET_HEADER: return {
            ...state,
            headerSet: action.payload
        }
        case actions.SET_ACTIVE_SET: return {
            ...state,
            activeSet: action.payload
        }
        case actions.SET_END_GAME: return {
            ...state,
            endGame: action.payload
        }
        case actions.SET_RESULT: return {
            ...state,
            result: action.payload
        }
        default: return state
    }
}

export default board