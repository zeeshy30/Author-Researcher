import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Menu from '../../components/Menu';
import { Dropdown } from 'react-native-material-dropdown';
import Icon from 'react-native-vector-icons/AntDesign';

import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';
import { fontSizes } from '../../BaseStyles';
import LoadingScreen from '../../components/LoadingScreen';


export default class Statistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            references: [],
            quotes: [],
            showViewsPerReference: false,
            showQuotesPerReference: false,
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData = async () => {
        try {
            let loginDetails = await AsyncStorage.getItem('loginDetails');
            loginDetails = JSON.parse(loginDetails);
            let promises = [];
            for (const index in loginDetails.references) {
                promises.push(firebase.firestore().collection('References').doc(loginDetails.references[index]).get());
            }
            const referencesSnap = await Promise.all(promises);

            promises = []
            const referenceData = referencesSnap.map(doc => {
                const data = doc.data();
                data.id = doc.id;
                for (const index in data.quotes) {
                    promises.push(firebase.firestore().collection('Quotes').doc(data.quotes[index]).get());
                }
                return data;
            });

            const quotesSnap = await Promise.all(promises);
            const quotesData = quotesSnap.map(doc => {
                const data = doc.data();
                data.id = doc.id;
                return doc.data();
            });
            this.setState({ references: referenceData, quotes: quotesData, loading: false });
        }
        catch (err) {
            alert(err);
        }
    }

    numOfReferences = () => {
        return this.state.references.length;
    }

    getNumberOfViews = () => {
        return this.state.references.length &&
            this.state.references.map(ref => {
                return ref.views.length
            }).reduce((acc, val) => acc + val);
    }

    getNumberOfViewsPerReference = () => {
        return this.state.references.map(ref =>
            <Text style={styles.text}> {ref.title} : {ref.views.length}</Text>
        );
    }

    getNumberOfQuotesPerReference = () => {
        return this.state.references.map(ref =>
            <Text style={styles.text}> {ref.title} : {ref.quotes.length}</Text>
        );
    }

    getNumberOfQuotes = () => {
        return this.state.references.length && this.state.references.map(ref => {
            return ref.quotes.length
        }).reduce((acc, val) => acc + val);
    }

    render() {
        const { showViewsPerReference, showQuotesPerReference } = this.state;
        return (
            <>
                <Menu navigation={this.props.navigation} />
                {this.state.loading ? <LoadingScreen /> :
                    <View >
                        <Text style={styles.text}>Number of References : {this.numOfReferences()}</Text>
                        <Text style={styles.text}>Number of Views : {this.getNumberOfViews()} </Text>
                        <Text style={styles.text}>Number of Quotes : {this.getNumberOfQuotes()}</Text>
                        <TouchableOpacity
                            style={styles.dropdownStyle}
                            onPress={() => this.setState({ showViewsPerReference: !showViewsPerReference, showQuotesPerReference: false })}
                        >
                            <Text style={{ fontSize: fontSizes.large }}>{
                                showViewsPerReference ? 'Hide' : 'Show'} Views Per Reference <Icon name={showViewsPerReference ? 'up' : 'down'} size={20} />
                            </Text>
                            {showViewsPerReference && this.getNumberOfViewsPerReference()}
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.dropdownStyle}
                            onPress={() => this.setState({ showQuotesPerReference: !showQuotesPerReference, showViewsPerReference: false })}
                        >
                            <Text style={{ fontSize: fontSizes.large }}>{
                                showQuotesPerReference ? 'Hide' : 'Show'} Quotes Per Reference <Icon name={showQuotesPerReference? 'up' : 'down'} size={20} />
                            </Text>
                            {showQuotesPerReference && this.getNumberOfQuotesPerReference()}
                        </TouchableOpacity>
                    </View>
                }
            </>
        )
    }
}


const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },


    text: {
        width: '100%',
        fontSize: fontSizes.large,
        marginTop: 10,
        backgroundColor: 'white',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    dropdownStyle: {
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: '#08B4C5',
        marginTop: 10,
        fontSize: fontSizes.large,
    },
});