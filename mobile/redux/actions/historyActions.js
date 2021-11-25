import {
    ADD_HISTORY,
    ADD_HISTORY_LOADING, DELETE_HISTORY, DELETE_HISTORY_LOADING,
    LOADING_HISTORY,
    SET_HISTORIES,

} from "../types";
import axios from "axios";


const connection = 'http://192.168.0.104:5000'

export const getHistories = () => (dispatch) => {
    dispatch({type: LOADING_HISTORY})
    axios.get(`${connection}/api/history/`)
        .then(res => {
            dispatch({
                type: SET_HISTORIES,
                payload: res.data
            })
        })
        .catch((err) => {
            dispatch({
                type: SET_HISTORIES,
                payload: []
            });
        });
}

export const addHistory = (newHistory) => (dispatch) => {
    dispatch({type: ADD_HISTORY_LOADING})
    axios.post(`${connection}/api/history/addHistory`, newHistory)
        .then((res) => {
            dispatch({
                type: ADD_HISTORY,
                payload: res.data
            })
        })
        .catch((err) => {
            console.log(err)
        })
}

export const deleteHistory = (historyId) => (dispatch) => {
    dispatch({type: DELETE_HISTORY_LOADING})
    axios.delete(`${connection}/api/history/deleteHistory/` + historyId)
        .then((res) => {
            dispatch({
                type: DELETE_HISTORY,
                payload: res.data
            })
        })
        .catch((err) => {
            console.log(err)
        })
}



