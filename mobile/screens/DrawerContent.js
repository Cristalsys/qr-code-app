import React from "react";
import {StyleSheet, View} from "react-native";
import {
    Avatar,
    Title,
    Drawer,
} from 'react-native-paper'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {DrawerContentScrollView, DrawerItem} from "@react-navigation/drawer";
import {connect} from "react-redux";
import {logoutUser} from "../redux/actions/userActions";


const DrawerContent = (props) => {


    const signOut = () => {
        props.logoutUser()
    }

    return (
        <View style={{flex: 1, backgroundColor: '#F4F6F8'}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection: 'row', marginTop: 15}}>
                            <Avatar.Image
                                source={{
                                    uri: props.user.avatar ? props.user.avatar : null
                                }}
                                size={50}
                            />
                            <View style={{marginLeft: 15, flexDirection: 'column', justifyContent: 'center'}}>
                                <Title style={styles.title}>{props.user.firstName + ' ' + props.user.lastName}</Title>
                            </View>
                        </View>

                        <Drawer.Section style={styles.drawerSection}>
                            <DrawerItem
                                icon={({color, size}) => (
                                    <MaterialCommunityIcons
                                        name="home-outline"
                                        color={color}
                                        size={size}
                                    />
                                )}
                                label="Home"
                                onPress={() => {
                                    props.navigation.navigate('Home')
                                }}
                            />
                            <DrawerItem
                                icon={({color, size}) => (
                                    <MaterialCommunityIcons
                                        name="account-outline"
                                        color={color}
                                        size={size}
                                    />
                                )}
                                label="Profile"
                                onPress={() => {
                                    props.navigation.navigate('Profile')
                                }}
                            />
                            <DrawerItem
                                icon={({color, size}) => (
                                    <MaterialCommunityIcons
                                        name="plus"
                                        color={color}
                                        size={size}
                                    />
                                )}
                                label="History"
                                onPress={() => {
                                    props.navigation.navigate('History')
                                }}
                            />
                        </Drawer.Section>
                    </View>
                </View>

            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({color, size}) => (
                        <MaterialCommunityIcons name="logout" color={color} size={size}/>
                    )}
                    label="Sign out"
                    onPress={() => signOut()}
                />
            </Drawer.Section>
        </View>
    )
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps, {logoutUser})(DrawerContent)


const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
        backgroundColor: '#F4F6F8'
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});