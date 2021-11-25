import {
    SET_POSTS,
    LOADING_DATA,
    SET_POST,
    DELETE_POST,
    ADD_POST,
    LOADING_DATA_POST,
    LOADING_DETAILS,
    LOADING_POST_DETAILS,
    EDIT_DETAILS,
    EDIT_DETAILS_POST,
    LOADING_POST_IMAGE, ADD_POST_FILE, GET_VALIDATE
} from '../types'

const initialState = {
    loading: false,
    loadingPost: false,
    loadingDetailsPost: false,
    loadingPostImage: false,
    posts: [],
    post: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING_DATA: {
            return {
                ...state,
                loading: true
            }
        }
        case LOADING_DATA_POST: {
            return {
                ...state,
                loadingPost: true
            }
        }
        case SET_POSTS: {
            return {
                ...state,
                posts: action.payload,
                loading: false
            }
        }
        case SET_POST:
            return {
                ...state,
                post: action.payload,
                loadingPost: false
            }
        default:
            return state
    }
}
