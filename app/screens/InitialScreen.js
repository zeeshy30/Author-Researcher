import React, { Component } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import AsyncStorage from '@react-native-community/async-storage'

import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';
import { Actions } from 'react-native-router-flux';


import { colors } from '../BaseStyles';

export default class InitialScreen extends Component {

    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                firebase.firestore().collection('Users').where('id', '==', user.uid).get()
                    .then(snapshot => {
                        snapshot.forEach(doc => {
                            const details = doc.data();
                            details.docID = doc.id;
                            AsyncStorage.setItem('loginDetails', JSON.stringify(details));
                        });
                    });
                Actions.dashboard();
            } else {
                Actions.login();
            }
        });
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