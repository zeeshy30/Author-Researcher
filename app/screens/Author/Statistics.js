import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import FIcon from 'react-native-vector-icons/Feather';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';
import { Table, Row, Rows } from 'react-native-table-component';

import { fontSizes } from '../../BaseStyles';
import LoadingScreen from '../../components/LoadingScreen';

const Stack = createStackNavigator();

export default Stat = props => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Statistics"
                component={Statistics}
                options={{
                    headerLeft: () => (
                        <FIcon
                            name='menu'
                            color='#000'
                            size={26}
                            style={{ marginLeft: 10 }}
                            onPress={() => props.navigation.openDrawer()}
                        />
                    ),
                    headerStyle: {
                        backgroundColor: '#eee',
                    }
                }}
            />
        </Stack.Navigator>

    );
}


class Statistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            references: [],
            quotes: [],
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
        const data = this.state.references.map(ref => [ref.title, ref.views.length]);
        return (
            <View style={styles.tableContainer}>
                <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                    <Row data={['Reference', 'Views']} style={styles.tableHead} textStyle={styles.tableText} />
                    <Rows data={data} textStyle={styles.tableText} />
                </Table>
            </View>
        );
    }

    getNumberOfQuotesPerReference = () => {
        const data = this.state.references.map(ref => [ref.title, ref.quotes.length]);
        return (
            <View style={styles.tableContainer}>
                <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                    <Row data={['Reference', 'Number of Quotes']} style={styles.tableHead} textStyle={styles.tableText} />
                    <Rows data={data} textStyle={styles.tableText} />
                </Table>
            </View>
        );
    }

    getNumberOfQuotes = () => {
        return this.state.references.length && this.state.references.map(ref => {
            return ref.quotes.length
        }).reduce((acc, val) => acc + val);
    }

    render() {
        return (
            <>
                {this.state.loading ? <LoadingScreen /> : (
                    <ScrollView >
                        <Text style={styles.text}>Number of References : {this.numOfReferences()}</Text>
                        <Text style={styles.text}>Number of Views : {this.getNumberOfViews()} </Text>
                        <Text style={styles.text}>Number of Quotes : {this.getNumberOfQuotes()}</Text>

                        <Text style={styles.tableTitle}> Views Per Reference </Text>
                        {this.getNumberOfViewsPerReference()}
                        <Text style={styles.tableTitle}> Quotes Per Reference </Text>
                        {this.getNumberOfQuotesPerReference()}
                    </ScrollView>)}
            </>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tableContainer: {
        flex: 1,
        backgroundColor: 'white',
        margin: 15,
        marginTop: 0,
    },
    tableHead: {
        height: 40,
        backgroundColor: '#f1f8ff'
    },
    tableText: {
        margin: 6
    },
    tableTitle: {
        fontSize: fontSizes.normal,
        margin: 15,
        marginBottom: 0,
    },
    text: {
        width: '100%',
        fontSize: fontSizes.large,
        marginTop: 10,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
});