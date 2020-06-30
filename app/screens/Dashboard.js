import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { fontSizes } from '../BaseStyles';
import AsyncStorage from '@react-native-community/async-storage';
import LoadingScreen from '../components/LoadingScreen';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            userDetails: {},
        }
    }

    componentDidMount() {
        AsyncStorage.getItem('loginDetails').then(val => {
            this.setState({ userDetails: JSON.parse(val) }, this.setState({ loading: false }));
        })
    }

    render() {
        return (
            <>
                {this.state.loading
                    ? (<LoadingScreen />) :
                    < View style={styles.container}>
                        <TouchableOpacity
                            style={styles.Button}
                            onPress={() => Actions.authorcontrolpanel(this.state.userDetails)}
                        >
                            <Text style={styles.signupButton}>Author</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.Button}
                            onPress={() => Actions.search()}
                        >
                            <Text style={styles.signupButton}>Researcher</Text>
                        </TouchableOpacity>

                        {this.state.userDetails.isAdmin && <TouchableOpacity
                            style={styles.Button}
                            onPress={() => Actions.admindashboard()}
                        >
                            <Text style={styles.signupButton}>Admin</Text>
                        </TouchableOpacity>}
                    </View>}
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 25,
        paddingBottom: 25,

    },

    Button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        backgroundColor: '#08B4C5',
        borderRadius: 25,
        marginVertical: 25,
        paddingVertical: 12,
    },
    signupButton: {
        color: 'white',
        fontSize: fontSizes.large,
        fontWeight: 'bold',
        fontSize: 30
    }

})
