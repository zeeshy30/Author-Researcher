import React, { Component } from 'react'
import { Text, View, Alert } from 'react-native'
import { Actions } from 'react-native-router-flux';

import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';

import LoadingScreen from '../components/LoadingScreen';
import Form from '../components/Form';
import Button from '../components/Button';

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            loading: false,
        }
    }
    passwordReset = async () => {
        this.setState({ loading: true });
        try {
            await firebase.auth().sendPasswordResetEmail(this.state.email);
            this.setState({ loading: false });
            Actions.login();
        } catch (err) {
            this.setState({ loading: false });
            alert(err);
        }
    }

    render() {
        return this.state.loading
            ? <LoadingScreen /> : (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Form
                        placeholder="Email"
                        onUpdate={val => this.setState({ email: val })}
                        keyboardType="email-address"
                        value={this.state.email}
                    />
                    <Button onPress={this.passwordReset} text="Submit" />
                </View>
            )
    }
}

export default ForgotPassword
