import {
    SET_USER,
    SET_AUTHENTICATED,
    SET_UNAUTHENTICATED,
    LOADING_USER, UPLOAD_IMAGE, LOADING_IMAGE, LOADING_DETAILS, EDIT_DETAILS, LOADING_USERS, SET_USERS, DELETE_USER

} from "../types";


const initialState = {
    authenticated: false,
    loading: false,
    loadingUsers: false,
    loadingImage: false,
    loadingDetails: false,
    email: '',
    avatar: '',
    firstName: '',
    lastName: '',
    organization: '',
    users: []

};


export default function (state = initialState, action) {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            }
        case SET_UNAUTHENTICATED: {
            return initialState
        }
        case LOADING_USER:
            return {
                ...state,
                loading: true
            };
        case LOADING_USERS:
            return {
                ...state,
                loadingUsers: true
            };
        case LOADING_IMAGE:
            return {
                ...state,
                loadingImage: true
            };
        case LOADING_DETAILS:
            return {
                ...state,
                loadingDetails: true
            };
        case SET_USER: {
            return {
                authenticated: true,
                loading: false,
                ...action.payload
            }
        }
        case SET_USERS: {
            return {
                ...state,
                loadingUsers: false,
                users: action.payload
            }
        }
        case UPLOAD_IMAGE: {
            return {
                ...state,
                loadingImage: false,
                avatar: action.payload.avatar,
            }
        }
        case EDIT_DETAILS: {
            return {
                ...state,
                loadingDetails: false,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                organization: action.payload.organization
            }
        }
        case DELETE_USER: {
            return {
                ...state,
                users: [...state.users.filter(
                    (u) => u._id !== action.payload
                )]
            }
        }
        default: {
            return state
        }
    }
}
