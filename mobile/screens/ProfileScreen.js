import React from "react";
import {StyleSheet, View, Text, Button, StatusBar, TextInput, TouchableOpacity} from "react-native";
import {Avatar, Title} from "react-native-paper";
import {connect} from "react-redux";


const ProfileScreen = ({navigation, user}) => {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content"/>
            <View style={styles.header}>
            </View>
            <View style={styles.footer}>
                <View>
                    <View style={{display: 'flex', alignItems: 'center'}}>
                        <Avatar.Image style={styles.image}
                                      source={{
                                          uri: user.avatar ? user.avatar : null
                                      }}
                                      size={120}
                        />
                    </View>
                    <View style={styles.items}>
                        <View style={styles.item}>
                            <View style={styles.itemLeft}>
                                <View style={styles.square}></View>
                                <Text style={styles.itemText}>{"Full name: " + user.firstName + " " +
                                user.lastName
                                }</Text>
                            </View>
                            <View style={styles.circular}></View>
                        </View>
                        {user.organization &&
                        <View style={styles.item}>

                            <View style={styles.itemLeft}>
                                <View style={styles.square}></View>
                                <Text>
                                    {"Organization: " + user.organization}
                                </Text>
                            </View>
                            <View style={styles.circular}></View>
                        </View>
                        }
                        <View style={styles.item}>

                            <View style={styles.itemLeft}>
                                <View style={styles.square}></View>
                                <Text>
                                    {"Email: " + user.email}
                                </Text>
                            </View>
                            <View style={styles.circular}></View>
                        </View>
                    </View>

                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3F51B5'
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 50,
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    footer: {
        flex: 5,
        backgroundColor: '#F4F6F8',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    image: {
        marginTop: -90
    },
    items: {marginTop: 30},
    item: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20

    },
    button: {
        backgroundColor: '#fff',
        padding: 5,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 0,
        fontSize: 10
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    square: {
        width: 24,
        height: 24,
        backgroundColor: '#3f51b5',
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 15
    },
    itemText: {
        maxWidth: '80%'
    },
    circular: {
        width: 12,
        height: 12,
        borderColor: '#3f51b5',
        borderWidth: 2,
        borderRadius: 5
    }

});

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps, {})(ProfileScreen)
