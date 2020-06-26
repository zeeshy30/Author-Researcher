
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';
import { Dropdown } from 'react-native-material-dropdown';
import DatePicker from 'react-native-datepicker'


import Form from '../components/Form';
import Button from '../components/Button';
import { colors, fontSizes } from '../BaseStyles';

export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
            gender: '',
            language: '',
            bio: '',
            qualification: '',
            date: '',
        }
    }

    goBack() {
        Actions.pop();
    }

    setName = val => {
        this.setState({ fullName: val });
    }

    setEmail = val => {
        this.setState({ email: val });
    }

    setPassword = val => {
        this.setState({ password: val });
    }

    setConfirmPassword = val => {
        this.setState({ confirmPassword: val });
    }

    SignUp = () => {
        const {
            fullName,
            email,
            password,
            confirmPassword,
            gender,
            language,
            bio,
            qualification,
            date,
        } = this.state;

        if (password !== confirmPassword) {
            alert("Passwords don't match.");
            return;
        } else if (fullName === "" || email === "" || password === "" || confirmPassword === "") {
            alert("Please fill all the fields.");
            return;
        }

        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(res => {
                res.user.updateProfile({
                    displayName: fullName,
                });
                firebase.firestore().collection('Users').add({
                    id: res.user.uid,
                    email,
                    fullName,
                    gender,
                    language,
                    qualification,
                    dateOfBirth: date,
                })
                Actions.initialscreen();
            })
            .catch(error => alert(error));
    }

    showDatepicker = () => {
        this.setState({ showDatepicker: true });
    };


    render() {
        return (
            <ScrollView style={styles.contentContainer}>
                <View style={styles.formContainer}>
                    <Form
                        placeholder="Full Name"
                        onUpdate={this.setName}
                        onSubmitEditing={() => this.email.focus()}
                        ref={(input) => this.fullName = input}
                        value={this.state.fullName}
                    />
                    <DatePicker
                        style={styles.datePickerStyle}
                        date={this.state.date}
                        mode="date"
                        placeholder="Select Date of Birth"
                        format="YYYY-MM-DD"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                border: 0,
                                marginLeft: 36
                            }
                            // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(date) => { this.setState({ date: date }) }}
                    />
                    <Dropdown
                        containerStyle={styles.dropdownStyle}
                        pickerStyle={styles.pickerStyle}
                        label='Gender'
                        data={[{ value: 'Male' }, { value: 'Female' }]}
                        onChangeText={value => this.setState({ gender: value })}
                    />
                    <Form
                        placeholder="Email"
                        onUpdate={this.setEmail}
                        onSubmitEditing={() => this.password.focus()}
                        ref={(input) => this.email = input}
                        value={this.state.email}
                    />

                    <Form
                        placeholder="Password"
                        secureTextEntry={true}
                        onUpdate={this.setPassword}
                        onSubmitEditing={() => this.confirmPassword.focus()}
                        ref={(input) => this.password = input}
                        value={this.state.password}
                    />
                    <Form
                        placeholder="Confirm Password"
                        secureTextEntry={true}
                        onUpdate={this.setConfirmPassword}
                        onSubmitEditing={() => this.qualification.focus()}
                        ref={(input) => this.confirmPassword = input}
                        value={this.state.confirmPassword}
                    />
                    <Form
                        placeholder="Qualifcation"
                        onUpdate={val => this.setState({ qualification: val })}
                        onSubmitEditing={() => this.language.focus()}
                        ref={(input) => this.qualification = input}
                        value={this.state.qualification}
                    />
                    <Form
                        placeholder="Language"
                        onUpdate={val => this.setState({ language: val })}
                        ref={(input) => this.language = input}
                        value={this.state.language}
                    />
                    <Button onPress={this.SignUp} text="Sign up" />
                </View>

                <View style={styles.signupTextCont}>
                    <Text style={styles.signupText}>Already have an account? </Text>
                    <TouchableOpacity onPress={this.goBack}><Text style={styles.signupButton}>Sign in</Text></TouchableOpacity>
                </View>
            </ScrollView>
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
    contentContainer: {
        marginTop: 0,
        backgroundColor: '#F5FCFF',
    },
    text: {
        fontSize: 20,
        backgroundColor: 'white',
        textAlign: 'left',
        marginRight: 50,
        justifyContent: 'center',
        alignItems: 'center'
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
    },
    dropdownStyle: {
        width: 300,
        borderRadius: 25,
        backgroundColor: '#eeeeee',
        paddingHorizontal: 16,
        marginVertical: 10,
    },
    pickerStyle: {
        width: 300,
        borderRadius: 25,
        backgroundColor: '#eeeeee',
        paddingHorizontal: 16,
        marginVertical: 10,
    },
    datePickerStyle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        height: 60,
        borderRadius: 25,
        backgroundColor: '#eeeeee',
        paddingHorizontal: 16,
        marginVertical: 10,
    }
});