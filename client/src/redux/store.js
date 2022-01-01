import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunk from "redux-thunk";

import uiReducer from './reducers/uiReducer'
import userReducer from './reducers/userReducer'
import postReducer from './reducers/postReducer'

const initialState = {}

const middleware = [thunk]

const reducers = combineReducers({
    UI: uiReducer,
    user: userReducer,
    post: postReducer
})


const store = createStore(
    reducers,
    initialState,
    compose(
        applyMiddleware(...middleware),
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)

export default store
