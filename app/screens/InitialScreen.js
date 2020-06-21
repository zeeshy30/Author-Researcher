import React, { Component } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';


import { colors } from '../BaseStyles';

export default class InitialScreen extends Component {

    componentDidMount() {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
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