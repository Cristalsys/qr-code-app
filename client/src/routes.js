import React from "react";
import {Redirect, Route, Switch} from 'react-router-dom'
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AddDocument from "./pages/AddDocument";
import Settings from "./pages/Profile";
import About from "./pages/About";
import PostDialog from "./pages/Post";
import Administration from "./pages/Administration";

export const useRoutes = ({isAuthenticated, role}) => {
    if (isAuthenticated) {
        if (role === 1) {
            return (
                <Switch>
                    <Route exact path='/' component={Home}></Route>
                    <Route exact path='/add' component={AddDocument}></Route>
                    <Route exact path='/profile' component={Settings}></Route>
                    <Route exact path='/administration' component={Administration}></Route>
                    <Route exact path='/post/:postId' component={PostDialog}/>
                    <Redirect to="/"/>
                </Switch>
            )
        } else {
            return (
                <Switch>
                    <Route exact path='/' component={Home}></Route>
                    <Route exact path='/add' component={AddDocument}></Route>
                    <Route exact path='/profile' component={Settings}></Route>
                    <Route exact path='/about' component={About}></Route>
                    <Route exact path='/post/:postId' component={PostDialog}/>
                    <Redirect to="/"/>
                </Switch>
            )
        }
    }

    return (
        <Switch>
            <Route
                path="/register"
                render={() => <Register/>}
                exact
            />
            <Route
                path="/login"
                render={() => <Login/>}
                exact
            />
            <Redirect to="/login"/>
        </Switch>
    )
}
