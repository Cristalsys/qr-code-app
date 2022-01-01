import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from "./redux/store";
import {MuiThemeProvider} from "@material-ui/core";
import {Provider} from "react-redux";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import mainTheme from "./utils/theme";
import jwtDecode from "jwt-decode";
import {getUserData, logoutUser} from "./redux/actions/userActions";
import {SET_AUTHENTICATED} from "./redux/types";
import axios from "axios";

const theme = createMuiTheme(mainTheme)

const token = localStorage.FBIdToken;
if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
        window.location.href = '/login';
        store.dispatch(logoutUser())

    } else {
        store.dispatch({type: SET_AUTHENTICATED})
        axios.defaults.headers.common['Authorization'] = token;
        store.dispatch(getUserData());
    }
}

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <Provider store={store}>
            <App />
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
