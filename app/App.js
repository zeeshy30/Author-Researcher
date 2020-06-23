import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    StatusBar
} from 'react-native';

import Routes from './Routes';
//import HomeScreen from "./src/HomeScreen/index.js";

export default class App extends Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="#002f6c"
                    barStyle="light-content"
                />
                <Routes />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});