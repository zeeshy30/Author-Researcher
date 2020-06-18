import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage, Keyboard } from 'react-native';

import { Actions } from 'react-native-router-flux';

import { colors, fontSizes } from '../BaseStyles';
import Form from '../components/Form';
import Button from '../components/Button';


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }

    setEmail = val => {
        this.setState({ email: val });
    }

    setPassword = val => {
        this.setState({ password: val });
    }

    signup() {
        Actions.signup()
    }

    Login = () => {

    }

    render() {
        return (
            <View style={styles.container}>
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>
                <View style={styles.formContainer}>
                    <Form
                        placeholder="Email"
                        onUpdate={this.setEmail}
                        onSubmitEditing={() => this.password.focus()}
                    />
                    <Form
                        placeholder="Password"
                        secureTextEntry={true}
                        onUpdate={this.setPassword}
                        ref={(input) => this.password = input}
                    />
                </View>
                <Button onPress={this.Login} text="Login" />

                <View style={styles.signupTextCont}>
                    <Text style={styles.signupText}>Dont have an account yet? </Text>
                    <TouchableOpacity onPress={this.signup}><Text style={styles.signupButton}>Signup</Text></TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    formContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    button: {
        width: 300,
        backgroundColor: colors.button,
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 12
    },
    buttonText: {
        fontSize: fontSizes.normal,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    },
    signupTextCont: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingVertical: 16,
        flexDirection: 'row',
    },
    signupText: {
        color: colors.button,
        fontSize: fontSizes.normal,
    },
    signupButton: {
        color: colors.button,
        fontSize: fontSizes.normal,
        fontWeight: '500',
    }
});