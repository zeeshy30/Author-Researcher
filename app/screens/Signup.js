import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,Picker
} from 'react-native';
import firebase from 'react-native-firebase';
import Form from '../components/Form';
import Button from '../components/Button';
import RadioGroup from 'react-native-radio-buttons-group';
import { colors, fontSizes } from '../BaseStyles';
import { Actions } from 'react-native-router-flux';
import DateTimePicker from '@react-native-community/datetimepicker';

export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
            gender:'',
            Language:'',
            Description:'',
            Qualification:'',
            Date:new Date(),
            Video:''
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
        } = this.state;

        if (password !== confirmPassword) {
            alert("Passwords don't match.");
            return;
        } else if (fullName === "" || email === "" || password === "" || confirmPassword === ""){
            alert("Please fill all the fields.");
            return;
        }

        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(res => {
                res.user.updateProfile({
                    displayName: fullName
                });
                this.goBack();
            })
            .catch(error => alert(error));
    }

    render() {
        return (
            <ScrollView style={styles.contentContainer}>
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>
                <View style={styles.formContainer}>
                    <Form
                        placeholder="Full Name"
                        onUpdate={this.setName}
                        onSubmitEditing={() => this.email.focus()}
                        ref={(input) => this.fullName = input}
                        value={this.state.fullName}
                    />
                          {/*<DateTimePicker 
                                value={ this.state.Date }
                                mode='default'
                                display='default'
                          onChange={ date => this.setState({ Date:date }) } />*/}
               <Form
                    placeholder="Gender"
                    onUpdate={(item) =>this.setState({gender:item})}
                    value={this.state.gender}
                    ref={(input) => this.gender = input}
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
                        ref={(input) => this.confirmPassword = input}
                        
                        value={this.state.confirmPassword}
                    />
                    <Form
                        placeholder="Qualifcation"
                        secureTextEntry={true}
                        onUpdate={this.setConfirmPassword}
                        ref={(input) => this.confirmPassword = input}
                        
                        value={this.state.confirmPassword}
                    />
                      <Form
                        placeholder="Language"
                        secureTextEntry={true}
                        onUpdate={this.setConfirmPassword}
                        ref={(input) => this.confirmPassword = input}
                        
                        value={this.state.confirmPassword}
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
        paddingVertical: 20,
        backgroundColor: '#F5FCFF',
      },
      text: {
        fontSize: 20,
        backgroundColor: 'white',
        textAlign: 'left',
        marginRight:50,
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
    }
});