import {
    SET_USER,
    SET_AUTHENTICATED,
    SET_UNAUTHENTICATED,
    LOADING_USER, UPLOAD_IMAGE, LOADING_IMAGE, LOADING_DETAILS, EDIT_DETAILS

} from "../types";


const initialState = {
    authenticated: false,
    loading: false,
    loadingImage: false,
    loadingDetails: false,
    email: '',
    avatar: '',
    firstName: '',
    lastName: ''

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
                lastName: action.payload.lastName
            }
        }

        default: {
            return state
        }
    }
}
