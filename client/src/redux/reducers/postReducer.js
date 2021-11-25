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
    LOADING_POST_IMAGE, ADD_POST_FILE
} from '../types'

const initialState = {
    loading: false,
    loadingPost: false,
    loadingDetailsPost: false,
    loadingPostImage: false,
    posts: [],
    post: []
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
        case LOADING_POST_DETAILS:
            return {
                ...state,
                loadingDetailsPost: true
            };
        case LOADING_POST_IMAGE:
            return {
                ...state,
                loadingPostImage: true
            };
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
        case DELETE_POST:
            return {
                ...state,
                posts: [...state.posts.filter(
                    (p) => p._id !== action.payload
                )],
            }
        case ADD_POST: {
            return {
                ...state,
                loadingPost: false,
                posts: [action.payload, ...state.posts]
            }
        }
        case ADD_POST_FILE: {
            return {
                ...state,
                loadingPostImage: false,
                post: {
                    ...state.post,
                    filePath: action.payload.filePath
                }

            }
        }
        case EDIT_DETAILS_POST: {
            return {
                ...state,
                loadingDetailsPost: false,
                post: {
                    ...state.post,
                    body: action.payload.body,
                    expirationDate: action.payload.expirationDate
                }

            }
        }
        default:
            return state
    }
}
