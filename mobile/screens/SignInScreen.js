import React from "react";

import {
    View, Text, Button, StyleSheet, TouchableOpacity, Dimensions, Platform, StatusBar,
    TextInput
} from "react-native"

import {connect} from "react-redux";
import {loginUser} from "../redux/actions/userActions";

const SignIn = (props) => {

    const [data, setData] = React.useState({
        email: '',
        password: '',
        check_textInputChange: false,
        isValidUser: true,
        isValidPassword: true,
    });


    const textInputChange = (val) => {
        if (val.trim().length >= 0) {
            setData({
                ...data,
                email: val,
                check_textInputChange: true
            });
        } else {
            setData({
                ...data,
                email: val,
                check_textInputChange: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        if (val.trim().length >= 0) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    const loginHandle = (email, password) => {
        const userData = {
            email,
            password
        }
        props.loginUser(userData)
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content"/>
            <View style={styles.header}>
                <Text style={styles.text_header}>Welcome!</Text>
            </View>
            <View style={styles.footer}>
                <Text style={styles.text_footer}>Email</Text>
                <View style={styles.action}>
                    <TextInput
                        placeholder="Your Email"
                        style={styles.textInput}
                        autoCapitalize={"none"}
                        onChangeText={(val) => textInputChange(val)}
                    />
                </View>
                <Text style={[styles.text_footer, {
                    marginTop: 35
                }]}>Password</Text>
                <View style={styles.action}>
                    <TextInput
                        placeholder="Your Password"
                        style={styles.textInput}
                        autoCapitalize={"none"}
                        secureTextEntry={true}
                        onChangeText={(val) => handlePasswordChange(val)}
                    />
                </View>
                <View style={styles.buttons}>
                    <TouchableOpacity onPress={() => {
                        loginHandle(data.email, data.password)
                    }}>
                        <View style={[styles.signIn, {marginTop: 35}]}>
                            <Text style={[styles.textSign, {color: '#fff'}]}>Sign In</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        props.navigation.navigate('SignUpScreen')
                    }}>
                        <View style={[styles.signUp, {marginTop: 15}]}>
                            <Text style={[styles.textSign, {color: '#3F51B5'}]}>Sign Up</Text>
                        </View>
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    )
}

const mapStateToProps = (state) => ({})

export default connect(mapStateToProps, {loginUser})(SignIn)
// export default SignIn

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3F51B5'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#F4F6F8',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#B7B6B4',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#3F51B5'
    },
    signUp: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#fff',
        borderColor: '#3F51B5',
        borderWidth: 1
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});

