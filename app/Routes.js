import React, { Component } from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';
import {Stylesheet,View, TouchableOpacity, Text } from 'react-native';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Search from './screens/Search';
import Main from './screens/Main';
import InitialScreen from './screens/InitialScreen';
import Dashboard from './screens/Dashboard';
import { fontSizes } from './BaseStyles'
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
                    <Scene key="login" component={Login} title="Login" />
                    <Scene key="dashboard" component={Dashboard} title="Dashboard"/>
                    <Scene key="signup" component={Signup} title="Sign up" />
                    <Scene key="search" component={Search} title="Searchbar" />
                    <Scene key="main" component={Main} title="main" />
                    

                </Stack>
            </Router>
        )
    };


const styles ={
    barButtonIconStyle: {
        tintColor: 'white'
    },
};