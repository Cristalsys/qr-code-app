import {
    LOADING_DATA,
    SET_POSTS,
    SET_POST,
    LOADING_DATA_POST, GET_VALIDATE,
} from "../types";
import axios from "axios";

const connection = 'http://192.168.0.104:5000'

export const getPosts = () => (dispatch) => {
    dispatch({type: LOADING_DATA})
    axios.get(`${connection}/api/post/`)
        .then(res => {
            dispatch({
                type: SET_POSTS,
                payload: res.data
            })
        })
        .catch((err) => {
            dispatch({
                type: SET_POSTS,
                payload: []
            });
        });
}

export const getPost = (postId) => (dispatch) => {
    dispatch({type: LOADING_DATA_POST})
    axios.get(`${connection}/api/post/${postId}`)
        .then((res) => {
            dispatch({
                type: SET_POST,
                payload: res.data
            })
        })
        .catch((err) => console.log(err))
}


