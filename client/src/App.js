import React from 'react'
import './index.css'
import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from './routes'
import {connect} from "react-redux";


function App(props) {

    const routes = useRoutes(
        {
            isAuthenticated: props.authenticated,
            role: props.role
        })

    return (
        <Router>
            {!props.loading && routes}
        </Router>

    );
}

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated,
    role: state.user.role,
    loading: state.user.loading
});

export default connect(mapStateToProps)(App)