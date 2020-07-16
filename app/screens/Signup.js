
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    PermissionsAndroid,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { Actions } from 'react-native-router-flux';
import RNFetchBlob from 'rn-fetch-blob';
import { Dropdown } from 'react-native-material-dropdown';
import DatePicker from 'react-native-datepicker'
import Icons from "react-native-vector-icons/MaterialIcons"

import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';
import '@react-native-firebase/storage';

import Form from '../components/Form';
import Textarea from '../components/Textarea';
import Button from '../components/Button';
import LoadingScreen from '../components/LoadingScreen';
import { colors, fontSizes } from '../BaseStyles';

export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            processing: false,
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
            gender: '',
            language: '',
            bio: '',
            qualification: '',
            date: '',
            imageName: '',
            imageURI: '',
            country: '',
            city: '',
            phoneNumber: '',
            pageNum: 1,
        }
    }

    goBack() {
        Actions.login();
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
            imageName,
            imageURI,
            country,
            city,
            phoneNumber,
        } = this.state;

        if (password !== confirmPassword) {
            alert("Passwords don't match.");
            return;
        } else if (fullName === "" || email === "" || password === "" || confirmPassword === "") {
            alert("Please fill all the fields.");
            return;
        }

        this.setState({ processing: true });

        let fileRef = null;
        if (imageName != '')
            fileRef = firebase.storage().ref(email + '-' + imageName);

        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(async res => {
                res.user.updateProfile({
                    displayName: fullName,
                });
                try {
                    if (fileRef)
                        await fileRef.putFile(imageURI);
                    await firebase.firestore().collection('Users').doc(res.user.uid).set({
                        email,
                        fullName,
                        bio,
                        gender,
                        language,
                        qualification,
                        dateOfBirth: date,
                        phoneNumber,
                        city,
                        country,
                        imageName: imageName === '' ? '' : (email + '-' + imageName),
                    });
                    Actions.initialscreen();
                } catch (err) {
                    this.setState({ processing: false })
                    alert(err);
                };
            })
            .catch(error => {
                this.setState({ processing: false })
                alert(error)
            });
    }

    showDatepicker = () => {
        this.setState({ showDatepicker: true });
    };

    uploadPicture = async () => {
        try {
            const filePermission = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            );
            if (filePermission === PermissionsAndroid.RESULTS.GRANTED) {
                const res = await DocumentPicker.pick({
                    type: [DocumentPicker.types.images],
                });

                await RNFetchBlob.fs.stat(res.uri).then(stat => {
                    const name = res.name;
                    const imageURI = stat.path;
                    this.setState({ imageName: name, imageURI });
                });
            }
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
            } else {
                alert(err);
            }
        }
    }


    render() {
        return <>
            {this.state.processing
                ? <LoadingScreen /> : (
                    <ScrollView style={styles.contentContainer}>
                        <View style={styles.formContainer}>
                            {this.state.pageNum === 1 && (
                                <>
                                    <Form
                                        placeholder="Full Name"
                                        onUpdate={this.setName}
                                        onSubmitEditing={() => this.email.focus()}
                                        ref={(input) => this.fullName = input}
                                        value={this.state.fullName}
                                    />
                                    <Form
                                        placeholder="Email"
                                        onUpdate={this.setEmail}
                                        onSubmitEditing={() => this.password.focus()}
                                        keyboardType="email-address"
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
                                    <Icons name='collections' size={20} onPress={this.uploadPicture} />
                                    <Text style={{ fontSize: 16 }}>
                                        {this.state.imageName === '' ? 'Upload Profile Picture' : this.state.imageName}
                                    </Text>

                                    <Button onPress={() => this.setState({ pageNum: 2 })} text='Next' />

                                </>)}
                            {this.state.pageNum === 2 && (
                                <>
                                    <Textarea
                                        placeholder="Bio"
                                        onUpdate={val => this.setState({ bio: val })}
                                        value={this.state.bio}
                                    />
                                    <Dropdown
                                        containerStyle={styles.dropdownStyle}
                                        pickerStyle={styles.pickerStyle}
                                        label='Gender'
                                        data={[{ value: 'Male' }, { value: 'Female' }]}
                                        onChangeText={value => this.setState({ gender: value })}
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
                                        }}
                                        onDateChange={(date) => { this.setState({ date: date }) }}
                                    />
                                    <Button onPress={() => this.setState({ pageNum: 3 })} text='Next' />
                                    <Button onPress={() => this.setState({ pageNum: 1 })} text='Back' />
                                </>)}
                            {this.state.pageNum === 3 && (
                                <>
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
                                        onSubmitEditing={() => this.phoneNumber.focus()}
                                        value={this.state.language}
                                    />
                                    <Form
                                        placeholder="Phone Number"
                                        onUpdate={val => this.setState({ phoneNumber: val })}
                                        onSubmitEditing={() => this.country.focus()}
                                        ref={(input) => this.phoneNumber = input}
                                        value={this.state.phoneNumber}
                                        keyboardType="phone-pad"
                                    />
                                    <Form
                                        placeholder="Country"
                                        onUpdate={val => this.setState({ country: val })}
                                        onSubmitEditing={() => this.city.focus()}
                                        ref={(input) => this.country = input}
                                        value={this.state.country}
                                    />
                                    <Form
                                        placeholder="City"
                                        onUpdate={val => this.setState({ city: val })}
                                        ref={(input) => this.city = input}
                                        value={this.state.city}
                                    />

                                    <Button onPress={() => this.setState({ pageNum: 2 })} text='Back' />
                                    <Button onPress={this.SignUp} text="Sign up" />
                                </>
                            )}
                        </View>

                        <View style={styles.signupTextCont}>
                            <Text style={styles.signupText}>Already have an account? </Text>
                            <TouchableOpacity onPress={this.goBack}><Text style={styles.signupButton}>Sign in</Text></TouchableOpacity>
                        </View>
                    </ScrollView>
                )}
        </>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
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