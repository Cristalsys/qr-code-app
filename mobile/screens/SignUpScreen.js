import React from "react";
import {StyleSheet, View, Text, Button, StatusBar, TextInput, TouchableOpacity, Platform} from "react-native";




const SignUpScreen = (props) => {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content"/>
            <View style={styles.header}>
                <Text style={styles.text_header}>Register</Text>
            </View>
            <View style={styles.footer}>

                <Text style={[styles.text_footer, {
                    marginTop: 10
                }]}>FirstName</Text>
                <View style={styles.action}>
                    <TextInput
                        placeholder="Your FirstName"
                        style={styles.textInput}
                        autoCapitalize={"none"}
                    />
                </View>
                <Text style={[styles.text_footer, {
                    marginTop: 10
                }]}>LastName</Text>
                <View style={styles.action}>
                    <TextInput
                        placeholder="Your LastName"
                        style={styles.textInput}
                        autoCapitalize={"none"}
                    />
                </View>
                <Text style={[styles.text_footer, {marginTop: 10}]}>Organization</Text>
                <View style={styles.action}>
                    <TextInput
                        placeholder="Your Organization"
                        style={styles.textInput}
                        autoCapitalize={"none"}
                    />
                </View>
                <Text style={[styles.text_footer,{
                    marginTop: 10
                }]}>Email</Text>
                <View style={styles.action}>
                    <TextInput
                        placeholder="Your Email"
                        style={styles.textInput}
                        autoCapitalize={"none"}
                    />
                </View>

                <Text style={[styles.text_footer, {
                    marginTop: 10
                }]}>Password</Text>
                <View style={styles.action}>
                    <TextInput
                        placeholder="Your Password"
                        style={styles.textInput}
                        autoCapitalize={"none"}
                        secureTextEntry={true}
                    />
                </View>
                <Text style={[styles.text_footer, {
                    marginTop: 10
                }]}>Confirm Password</Text>
                <View style={styles.action}>
                    <TextInput
                        placeholder="Confirm Password"
                        style={styles.textInput}
                        autoCapitalize={"none"}
                        secureTextEntry={true}
                    />
                </View>
                <View style={styles.buttons}>
                    <TouchableOpacity onPress={() => {

                    }}>
                        <View style={[styles.signIn, {marginTop: 15}]}>
                            <Text style={[styles.textSign, {color: '#fff'}]}>Sign Up</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        props.navigation.navigate('SignInScreen')
                    }}>
                        <View style={[styles.signUp, {marginTop: 15}]}>
                            <Text style={[styles.textSign, {color: '#3F51B5'}]}>Sign In</Text>
                        </View>
                    </TouchableOpacity>

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
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 20
    },
    footer: {
        flex: 7,
        backgroundColor: '#F4F6F8',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 10
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
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#3F51B5'
    },
    signUp: {
        width: '100%',
        height: 40,
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
export default SignUpScreen