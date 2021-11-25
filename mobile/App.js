import React, {} from "react";
import store from './redux/store'
import {Provider} from "react-redux";
import AppNavContainer from "./screens";

export default function App() {

    return (
        <Provider store={store}>
            <AppNavContainer/>
        </Provider>

    )
}