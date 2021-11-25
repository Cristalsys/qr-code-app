import React, {useEffect} from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createDrawerNavigator} from "@react-navigation/drawer";
import RootStackScreen from "../screens/RootStackScreen";
import {View, Text} from 'react-native'


import AsyncStorage from '@react-native-async-storage/async-storage'
import store from '../redux/store'
import {connect} from "react-redux";
import {getUserData} from "../redux/actions/userActions";
import {SET_AUTHENTICATED} from "../redux/types";
import axios from "axios";
import DrawerContent from "../screens/DrawerContent";
import MainTabScreen from "../screens/MainTabScreen";
import {getPosts} from "../redux/actions/postActions";
import {getHistories} from "../redux/actions/historyActions";
import ActivityIndicator from "react-native-paper/src/components/ActivityIndicator";
import DetailsPost from "./DetailsPost";
import {createStackNavigator} from "@react-navigation/stack";


const Drawer = createDrawerNavigator()

AsyncStorage.getItem('FBIdToken').then((token) => {
    if (token) {
        store.dispatch({type: SET_AUTHENTICATED})
        axios.defaults.headers.common['Authorization'] = token;
        store.dispatch(getUserData());
        store.dispatch(getPosts())
        store.dispatch(getHistories())
    }

})

function AppNavContainer(props) {
    const {authenticated} = props.user


    if (props.loading && props.loadingPost && props.loadingHistory) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size={'large'}/>
            </View>
        )
    }

    return (
        <>
            <NavigationContainer>
                {authenticated ? (
                    <Drawer.Navigator drawerContent={props => <DrawerContent {...props}/>}>
                        <Drawer.Screen name="HomeDrawer" component={MainTabScreen}/>
                    </Drawer.Navigator>
                ) : (
                    <RootStackScreen/>
                )
                }
            </NavigationContainer>
        </>
    )
}

const mapStateToProps = (state) => ({
    user: state.user,
    loading: state.user.loading,
    loadingHistory: state.history.loadingHistory,
    loadingPost: state.post.loading
})

export default connect(mapStateToProps, {})(AppNavContainer)
