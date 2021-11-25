import HomeScreen from "./HomeScreen";
import {Ionicons} from "@expo/vector-icons";
import DetailsScreen from "./DetailsScreen";
import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import ProfileScreen from "./ProfileScreen";
import DetailsPostScreen from "./DetailsPost";

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DetailsPostFileScreen from "./DetailsPostFileScreen";

const HomeStack = createStackNavigator()
const DetailsStack = createStackNavigator()
const ProfileStack = createStackNavigator()
const DetailsPost = createStackNavigator()

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
    <Tab.Navigator
        initialRouteName="Home"
        activeColor="#fff"
        barStyle={{backgroundColor: '#3F51B5'}}
    >
        <Tab.Screen
            name="History"
            component={DetailsStackScreen}
            options={{
                tabBarLabel: 'History',
                topBarColor: '#3F51B5',
                tabBarIcon: ({color}) => (
                    <MaterialCommunityIcons name="plus" color={color} size={26}/>
                ),
            }}
        />
        <Tab.Screen
            name="Home"
            component={HomeStackScreen}
            options={{
                tabBarLabel: 'Home',
                topBarColor: '#3F51B5',
                tabBarIcon: ({color}) => (
                    <MaterialCommunityIcons name="home" color={color} size={26}/>
                ),
            }}
        />
        <Tab.Screen
            name="Profile"
            component={ProfileStackScreen}
            options={{
                tabBarLabel: 'Profile',
                topBarColor: '#3F51B5',
                tabBarIcon: ({color}) => (
                    <MaterialCommunityIcons name="account" color={color} size={26}/>
                ),
            }}
        />
    </Tab.Navigator>

)

export default MainTabScreen

const HomeStackScreen = ({navigation}) => (
    <HomeStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#3F51B5'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <HomeStack.Screen name="Home" component={HomeScreen}
                          options={{
                              headerLeft: () => (
                                  <Ionicons.Button name="menu" size={25}
                                                   backgroundColor={'#3F51B5'} onPress={() => navigation.openDrawer()
                                  }></Ionicons.Button>

                              )
                          }}
        />
    </HomeStack.Navigator>
)

const DetailsStackScreen = ({navigation}) => (
    <DetailsStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#3F51B5'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <DetailsStack.Screen name="History" component={DetailsScreen}
                             options={{
                                 headerLeft: () => (
                                     <Ionicons.Button name="menu" size={25}
                                                      backgroundColor={'#3F51B5'} onPress={() => navigation.openDrawer()
                                     }></Ionicons.Button>

                                 ),
                                 // headerRight: () => (
                                 //     <Ionicons.Button name="remove-circle" size={25}
                                 //                      backgroundColor={'#3F51B5'} onPress={() => navigation.openDrawer()
                                 //     }></Ionicons.Button>
                                 //
                                 // )

                             }}
        />
        <DetailsStack.Screen name="HistoryPost" component={DetailsPostScreen}/>
        <DetailsStack.Screen name="HistoryPostFile" component={DetailsPostFileScreen}/>
    </DetailsStack.Navigator>
)

const ProfileStackScreen = ({navigation}) => (
    <ProfileStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#3F51B5'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <ProfileStack.Screen name="Profile" component={ProfileScreen}
                             options={{
                                 headerLeft: () => (
                                     <Ionicons.Button name="menu" size={25}
                                                      backgroundColor={'#3F51B5'} onPress={() => navigation.openDrawer()
                                     }></Ionicons.Button>
                                 ),
                             }}
        />
    </ProfileStack.Navigator>
)

const DetailsPostStackScreen = ({navigation}) => (
    <DetailsPost.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#3F51B5'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <DetailsPost.Screen name="HistoryPost" component={DetailsPostScreen}

        />
    </DetailsPost.Navigator>
)