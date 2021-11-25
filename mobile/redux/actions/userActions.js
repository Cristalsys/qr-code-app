import {
    CLEAR_ERRORS,
    LOADING_UI,
    SET_ERRORS,
    SET_USER,
    LOADING_USER,
    SET_UNAUTHENTICATED, SET_POSTS
} from '../types'
import axios from 'axios'
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getPosts} from "./postActions";
import {getHistories} from "./historyActions";


const connection = 'http://192.168.0.104:5000'

export const loginUser = (userData) => (dispatch) => {
    dispatch({type: LOADING_UI})

    axios.post(`${connection}/api/auth/signin`, userData)
        .then((res) => {
            setAuthorizationHeader(res.data.token).then(res => {
                dispatch(getUserData())
                dispatch(getPosts())
                dispatch(getHistories())
                dispatch({type: CLEAR_ERRORS})
            })

        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}


export const logoutUser = () => async (dispatch) => {
    await AsyncStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({type: SET_UNAUTHENTICATED});
    dispatch({type: SET_POSTS, payload: []})
};


const setAuthorizationHeader = async (token) => {
    const FBIdToken = `Bearer ${token}`;
    await AsyncStorage.setItem('FBIdToken', FBIdToken)
    axios.defaults.headers.common['Authorization'] = FBIdToken;
};

export const getUserData = () => (dispatch) => {
    dispatch({type: LOADING_USER});
    axios.get(`${connection}/api/user/me`)
        .then(res => {
            dispatch({
                type: SET_USER,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}
