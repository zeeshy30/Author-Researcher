import React, { Component } from 'react';
import { Stylesheet, View, TouchableOpacity, Text } from 'react-native';
import { Router, Stack, Scene, Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';

import Login from './screens/Login';
import Signup from './screens/Signup';
import Search from './screens/Search';
import Main from './screens/Main';
import InitialScreen from './screens/InitialScreen';

import Dashboard from './screens/Dashboard';
import ResearcherDashboard from './screens/ResearcherDashboard';
import { fontSizes } from './BaseStyles';

export default Routes = () => {

    logout = () => {
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
            navigationBarStyle={{ backgroundColor: '#1565c0', }}
            titleStyle={{ color: 'white', }}
        >
            <Stack key="root">
                <Scene key="initialscreen" component={InitialScreen} title="Loader" hideNavBar />
                <Scene key="login" component={Login} title="Login" type="replace" />
                <Scene key="dashboard" component={Dashboard} title="Dashboard" type="replace" renderRightButton={signoutButton} />
                <Scene key="signup" component={Signup} title="Sign up" />
                <Scene key="researcherdashboard" component={ResearcherDashboard} title="Researcher Dashboard" />
                <Scene key="search" component={Search} title="Searchbar" />
                <Scene key="main" component={Main} title="main" />


            </Stack>
        </Router>
    )
};

const styles = {
    barButtonIconStyle: {
        tintColor: 'white'
    },
    buttonText: {
        color: 'white',
        fontSize: fontSizes.normal,
    }
}
