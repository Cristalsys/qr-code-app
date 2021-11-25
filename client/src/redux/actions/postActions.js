import {
    LOADING_DATA,
    SET_POSTS,
    CLEAR_ERRORS,
    LOADING_UI,
    SET_POST,
    STOP_LOADING_UI,
    SET_ERRORS,
    DELETE_POST,
    ADD_POST,
    LOADING_DATA_POST,
    LOADING_DETAILS,
    EDIT_DETAILS,
    EDIT_DETAILS_POST,
    LOADING_POST_DETAILS,
    LOADING_POST_IMAGE, ADD_POST_FILE,
} from "../types";
import axios from "axios";


export const getPosts = () => (dispatch) => {
    dispatch({type: LOADING_DATA})
    axios.get('/post/myPosts')
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
    axios.get(`/post/${postId}`)
        .then((res) => {
            dispatch({
                type: SET_POST,
                payload: res.data
            })
        })
        .catch((err) => console.log(err))
}


export const deletePost = (postId) => (dispatch) => {
    axios.delete(`/post/${postId}`)
        .then(() => {
            dispatch({type: DELETE_POST, payload: postId})
        })
        .catch((err) => console.log(err))
}


export const addPost = (newPost, history) => (dispatch) => {
    dispatch({type: LOADING_DATA_POST})
    axios.post('/post/createPost', newPost)
        .then((res) => {
            dispatch({
                type: ADD_POST,
                payload: res.data
            })
            dispatch(clearErrors())
            history.push('/')
        })
        .catch((err) => {
            console.log(err)
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}

export const clearErrors = () => (dispatch) => {
    dispatch({type: CLEAR_ERRORS})
}

export const editPostDetails = (postDetails, postId) => (dispatch) => {
    dispatch({type: LOADING_POST_DETAILS});
    axios
        .post(`/post/editPostDetails/${postId}`, postDetails)
        .then((res) => {
            dispatch({
                type: EDIT_DETAILS_POST,
                payload: res.data
            })
        })
        .catch((err) => console.log(err));
};

export const uploadImagePost = (formData, postId) => (dispatch) => {
    dispatch({type: LOADING_POST_IMAGE})
    axios.post(`/post/uploadImagePost/${postId}`, formData)
        .then((res) => {
            dispatch({
                type: ADD_POST_FILE,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}