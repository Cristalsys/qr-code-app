import {
    ADD_HISTORY,
    ADD_HISTORY_LOADING, DELETE_HISTORY, DELETE_HISTORY_LOADING,
    LOADING_HISTORY,
    SET_HISTORIES

} from '../types'


const initialState = {
    loadingHistory: false,
    loadingHistoryAdd: false,
    loadingHistoryDelete: false,
    histories: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING_HISTORY: {
            return {
                ...state,
                loadingHistory: true
            }
        }
        case ADD_HISTORY_LOADING: {
            return {
                ...state,
                loadingHistoryAdd: true
            }
        }
        case DELETE_HISTORY_LOADING: {
            return {
                ...state,
                loadingHistoryDelete: true
            }
        }
        case SET_HISTORIES: {
            return {
                ...state,
                histories: action.payload,
                loadingHistory: false
            }
        }
        case ADD_HISTORY: {
            return {
                ...state,
                loadingHistoryAdd: false,
                histories: [action.payload, ...state.histories]
            }
        }
        case DELETE_HISTORY: {
            return {
                ...state,
                loadingHistoryDelete: false,
                histories: [...state.histories.filter(
                    (p) => p._id !== action.payload._id
                )]
            }
        }
        default:
            return state
    }
}
