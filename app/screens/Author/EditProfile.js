import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Switch,
    ScrollView,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import AsyncStorage from '@react-native-community/async-storage';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';


import Form from '../../components/Form';
import Textarea from '../../components/Textarea';
import Button from '../../components/Button';

export default class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            saving: false,
        };
    }

    componentDidMount() {
        AsyncStorage.getItem('loginDetails').then((value) => {
            this.setState({ ...JSON.parse(value) });
        });
    }

    UpdateProfile = async () => {
        const { docID, saving, ...rest } = this.state;
        if (this.state.saving) {
            return;
        }
        try {
            this.setState({ saving: true });
            await firebase.firestore().collection('Users').doc(docID).update(rest);
            await AsyncStorage.setItem('loginDetails', JSON.stringify({ docID: docID, ...rest })).done();
            this.props.navigation.navigate("Profile");
            this.setState({ saving: false });
        } catch (err) {
            this.setState({ saving: false });
            alert(err)
        }
    }

    render() {
        return <ScrollView contentContainerStyle={styles.contentContainer}>
            <Spinner
                visible={this.state.saving}
                textContent={'Saving...'}
                textStyle={styles.spinnerTextStyle}
            />
            <Text style={styles.title}> Full Name </Text>
            <Form
                value={this.state.fullName}
                onUpdate={val => this.setState({ fullName: val })}
            />
            <Text style={styles.title} > Bio </Text>
            <Textarea
                value={this.state.bio}
                onUpdate={val => this.setState({ bio: val })}
            />
            <Text style={styles.title} > Language </Text>
            <Form
                value={this.state.language}
                onUpdate={val => this.setState({ language: val })}
            />
            <Text style={styles.title} > Qualification </Text>
            <Form
                value={this.state.qualification}
                onUpdate={val => this.setState({ qualification: val })}
            />
            <Text style={styles.title} > Phone Number </Text>
            <Form
                value={this.state.phoneNumber}
                onUpdate={val => this.setState({ phoneNumber: val })}
                keyboardType="phone-pad"
            />
            <Text style={styles.title} > Country </Text>
            <Form
                value={this.state.country}
                onUpdate={val => this.setState({ country: val })}
            />
            <Text style={styles.title} > City </Text>
            <Form
                value={this.state.city}
                onUpdate={val => this.setState({ city: val })}
            />
            <Text>Hide Phone Number</Text>
            <Switch
                onValueChange={val => this.setState({ hideNumber: val })}
                value={this.state.hideNumber} />
            <Button onPress={this.UpdateProfile} text="Update Profile" />
        </ScrollView>
    }
}


const styles = StyleSheet.create({
    contentContainer: {
        paddingTop: 10,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    title: {
        alignSelf: 'flex-start',
        marginLeft: '15%',
        fontSize: 16,
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
})