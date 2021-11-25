import React from 'react'
import './index.css'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import jwtDecode from 'jwt-decode';
import axios from 'axios'

// Mui
import {ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import mainTheme from './utils/theme'

// redux
import store from './redux/store'
import {Provider} from 'react-redux'

//components
import Home from "./pages/Home";
import AuthRoute from "./hoc/AuthRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {getUserData, logoutUser} from "./redux/actions/userActions";
import {SET_AUTHENTICATED} from "./redux/types";
import AddDocument from "./pages/AddDocument";
import PostDialog from "./pages/Post";
import About from "./pages/About";
import Settings from "./pages/Profile";


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


function App() {
    return (
        <MuiThemeProvider theme={theme}>
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route exact path='/' component={Home}></Route>
                        <Route exact path='/add' component={AddDocument}></Route>
                        <Route exact path='/profile' component={Settings}></Route>
                        <Route exact path='/about' component={About}></Route>
                        <Route
                            exact
                            path='/post/:postId'
                            component={PostDialog}
                        />

                        <AuthRoute
                            exact
                            path='/login'
                            component={Login}
                        />
                        <AuthRoute
                            exact
                            path='/register'
                            component={Register}
                        />
                    </Switch>
                </Router>
            </Provider>
        </MuiThemeProvider>
    );
}

export default App;
