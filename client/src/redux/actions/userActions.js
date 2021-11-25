import {
    CLEAR_ERRORS,
    LOADING_UI,
    SET_ERRORS,
    SET_USER,
    LOADING_USER,
    SET_UNAUTHENTICATED, UPLOAD_IMAGE, LOADING_IMAGE, EDIT_DETAILS, LOADING_DETAILS,
} from '../types'
import axios from 'axios'

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({type: LOADING_UI})
    axios.post('/auth/signin', userData)
        .then((res) => {
            setAuthorizationHeader(res.data.token)
            dispatch(getUserData())
            dispatch({type: CLEAR_ERRORS})
            history.push('/')
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}

export const signupUser = (newUserData, history) => (dispatch) => {
    dispatch({type: LOADING_UI})
    axios.post('/auth/signup', newUserData)
        .then(res => {
            setAuthorizationHeader(res.data.token)
            dispatch(getUserData())
            dispatch({type: CLEAR_ERRORS})
            history.push('/')
        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
        });
}

export const logoutUser = (history) => (dispatch) => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({type: SET_UNAUTHENTICATED});
    history.push('/login')
};


const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
};

export const getUserData = () => (dispatch) => {
    dispatch({type: LOADING_USER});
    axios.get(`/user/me`)
        .then(res => {
            dispatch({
                type: SET_USER,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

export const uploadImage = (formData) => (dispatch) => {
    dispatch({type: LOADING_IMAGE})
    axios.post('/user/uploadImage', formData)
        .then((res) => {
            dispatch({
                type: UPLOAD_IMAGE,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

export const editUserDetails = (userDetails) => (dispatch) => {
    dispatch({type: LOADING_DETAILS});
    axios
        .post('/user/editUserDetails', userDetails)
        .then((res) => {
            dispatch({
                type: EDIT_DETAILS,
                payload: res.data
            })
        })
        .catch((err) => console.log(err));
};