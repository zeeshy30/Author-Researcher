import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

import Form from '../components/Form';
import Button from '../components/Button';

import { colors, fontSizes } from '../BaseStyles';
import { Actions } from 'react-native-router-flux';

export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            email: '',
            password: '',
        }
    }

    goBack() {
        Actions.pop()
    }

    setName = val => {
        this.setState({ fullName: val })
    }

    setEmail = val => {
        this.setState({ email: val });
    }

    setPassword = val => {
        this.setState({ password: val });
    }

    SignUp = () => {

    }

    render() {
        return (
            <View style={styles.container}>
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>
                <View style={styles.formContainer}>
                    <Form
                        placeholder="Full Name"
                        onUpdate={this.setName}
                        onSubmitEditing={() => this.email.focus()}
                    />
                    <Form
                        placeholder="Email"
                        onUpdate={this.setEmail}
                        onSubmitEditing={() => this.password.focus()}
                        ref={(input) => this.email = input}
                    />
                    <Form
                        placeholder="Password"
                        secureTextEntry={true}
                        onUpdate={this.setPassword}
                        ref={(input) => this.password = input}
                    />
                </View>
                <Button onPress={this.SignUp} text="Sign up"/>
                <View style={styles.signupTextCont}>
                    <Text style={styles.signupText}>Already have an account? </Text>
                    <TouchableOpacity onPress={this.goBack}><Text style={styles.signupButton}>Sign in</Text></TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    formContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    signupTextCont: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingVertical: 16,
        flexDirection: 'row'
    },
    signupText: {
        color: colors.button,
        fontSize: fontSizes.normal,
    },
    signupButton: {
        color: colors.button,
        fontSize: fontSizes.normal,
        fontWeight: '500'
    }
});