import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Router, Stack, Scene, Actions } from 'react-native-router-flux';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';

import Login from './screens/Login';
import Signup from './screens/Signup';
import AuthorDashboard from './screens/AuthorDashboard';
import InitialScreen from './screens/InitialScreen';
import Dashboard from './screens/Dashboard';
import Search from './screens/Search';
import Admin from './screens/Admin';
import Income from './screens/Income';
import AdminDashboard from './screens/AdminDashboard';

import { fontSizes } from './BaseStyles';
import AsyncStorage from '@react-native-community/async-storage';

export default Routes = () => {

    logout = () => {
        AsyncStorage.clear();
        firebase.auth().signOut();
        Actions.login();
    };

    const signoutButton = (
        <View>
            <TouchableOpacity style={{ marginRight: 10 }}>
                <Text style={styles.buttonText} onPress={this.logout}>Sign Out</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <Router barButtonIconStyle={styles.barButtonIconStyle}
            hideNavBar={false}
            navigationBarStyle={{ backgroundColor: '#F2F3F4', }}
            titleStyle={{ color: 'black',fontweight:'bold' }}
        >
            <Stack key="root">
                <Scene key="initialscreen" component={InitialScreen} title="Loader" hideNavBar />
                <Scene key="login" component={Login} title="Login" type="replace" />
                <Scene key="dashboard" component={Dashboard} title="Dashboard" type="replace" renderRightButton={signoutButton} />
                <Scene key="signup" component={Signup} title="Sign up" />
                <Scene key="search" component={Search} title="Search" />
                <Scene key="authorcontrolpanel" component={AuthorDashboard} title="Control Panel" hideNavBar />
                <Scene key="admindashboard" component={AdminDashboard} title="AdminDashboard" />
                <Scene key="admin" component={Admin} title="Admin" />
                <Scene key="income" component={Income} title="Income" />


            </Stack>
        </Router>
    )
};

const styles = {
    barButtonIconStyle: {
        tintColor: 'white'
    },
    buttonText: {
        color: 'black',
        fontSize: 20,
        fontweight:'bold',
    }
}
