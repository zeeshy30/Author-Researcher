import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import LoadingScreen from '../components/LoadingScreen';

import { Actions } from 'react-native-router-flux';

import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';

import { colors, fontSizes } from '../BaseStyles';
import Form from '../components/Form';
import Button from '../components/Button';


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            processing: false,
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

    forgotPassword() {
        Actions.forgotpassword();
    }

    signup() {
        Actions.signup()
    }

    Login = async () => {
        if (this.state.email === '' || this.state.password === '') {
            Alert.alert('Enter details to Login!')
            return;
        }


        try {
            const res = await firebase
                .auth()
                .signInWithEmailAndPassword(this.state.email, this.state.password);
            const doc = await firebase.firestore().collection('Users').doc(res.user.uid).get()
            const details = doc.data();
            details.docID = doc.id;
            try {
                if (details.imageName)
                    details.imageUrl = await firebase.storage()
                        .ref(details.imageName)
                        .getDownloadURL();
            } catch (err) { }
            await AsyncStorage.setItem('loginDetails', JSON.stringify(details));
            Actions.dashboard();
        } catch (err) {
            this.setState({ processing: false });
            alert(err);
        };
    }

    render() {
        return <>
            {this.state.processing
                ? <LoadingScreen /> : (
                    <View style={styles.container}>
                        <Text>{'\n'}</Text>
                        <Text>{'\n'}</Text>
                        <Image source={require('../logo.png')} />
                        <Text>{'\n'}</Text>
                        <Text>{'\n'}</Text>
                        <View style={styles.formContainer}>
                            <Form
                                placeholder="Email"
                                onUpdate={this.setEmail}
                                onSubmitEditing={() => this.password.focus()}
                                ref={(input) => this.email = input}
                                keyboardType="email-address"
                                value={this.state.email}
                            />
                            <Form
                                placeholder="Password"
                                secureTextEntry={true}
                                onUpdate={this.setPassword}
                                ref={(input) => this.password = input}
                                value={this.state.password}
                            />
                        </View>
                        <Button onPress={() => this.setState({ processing: true }, this.Login)} text="Login" />

                        <View style={styles.signupTextCont}>

                            <Text style={styles.signupText}>Dont have an account yet? </Text>
                            <TouchableOpacity onPress={this.signup}><Text style={styles.signupButton}>Signup</Text></TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={this.forgotPassword}><Text style={styles.forgotPassword}>Forgot Password?</Text></TouchableOpacity>
                    </View>
                )}
        </>
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
    forgotPassword: {
        color: colors.button,
        fontSize: fontSizes.normal,
        fontWeight: '500',
        paddingBottom: 16,
    },
    signupTextCont: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingTop: 16,
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