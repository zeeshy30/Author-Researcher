import React, { Component } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import AsyncStorage from '@react-native-community/async-storage'

import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';
import '@react-native-firebase/storage';
import { Actions } from 'react-native-router-flux';


import { colors } from '../BaseStyles';

export default class InitialScreen extends Component {

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        const user = firebase.auth().currentUser;
        if (user) {
            const doc = await firebase.firestore().collection('Users').doc(user.uid).get()
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
        } else {
            console.log('loggin');
            Actions.login();
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color={colors.button} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    }
})