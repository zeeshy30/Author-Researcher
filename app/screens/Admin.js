import React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';

import { fontSizes, colors } from '../BaseStyles';
import LoadingScreen from '../components/LoadingScreen';

export default class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            references: [],
            quotes: [],
            authors: [],
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData = async () => {
        try {
            const UsersPromise = firebase.firestore().collection('Users').get();
            const ReferencesPromise = firebase.firestore().collection('References').get();
            const QuotesPromise = firebase.firestore().collection('Quotes').get();
            const [Users, References, Quotes] = await Promise.all([UsersPromise, ReferencesPromise, QuotesPromise]);

            const usersData = [];
            Users.forEach(doc => {
                const data = doc.data();
                data.id = doc.id;
                usersData.push(data);
            });

            const referencesData = [];
            References.forEach(doc => {
                const data = doc.data();
                data.id = doc.id;
                referencesData.push(data);
            });

            const quotesData = [];
            Quotes.forEach(doc => {
                const data = doc.data();
                data.id = doc.id;
                quotesData.push(data);
            });


            this.setState({
                references: referencesData,
                quotes: quotesData,
                authors: usersData.filter(data => data.references && data.references.length > 0),
                loading: false
            });
        }
        catch (err) {
            this.setState({ loading: false });
            alert(err);
        }
    }

    getRatingOfReference = id => {
        const ref = this.state.references.filter(ref => ref.id === id);
        const values = Object.values(ref[0].rating);
        return values.length && values.reduce((acc, val) => acc + val) / values.length;
    }

    getRatingOfAuthor = id => {
        const author = this.state.authors.filter(author => author.id === id);
        const refRatings = author[0].references.map(refId =>
            this.getRatingOfReference(refId)
        );
        return refRatings.length && refRatings.reduce((acc, refRating) => acc + refRating) / refRatings.length;
    }

    getRatingOfAuthors = () => {
        const data = this.state.authors.map(author => [author.fullName, this.getRatingOfAuthor(author.id)])
        return (
            <View style={styles.tableContainer}>
                <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                    <Row data={['Author', 'Ratings']} style={styles.tableHead} textStyle={styles.tableText} />
                    <Rows data={data} textStyle={styles.tableText} />
                </Table>
            </View>
        );
    }

    getViewsOfReference = id => {
        const ref = this.state.references.filter(ref => ref.id === id);
        return ref[0].views.length;
    }

    getViewsOfAuthor = id => {
        const author = this.state.authors.filter(author => author.id === id);
        const refViews = author[0].references.map(refId =>
            this.getViewsOfReference(refId)
        );
        return refViews.length && refViews.reduce((acc, val) => acc + val);
    }

    getViewsOfAuthors = () => {
        const data = this.state.authors.map(author => [author.fullName, this.getViewsOfAuthor(author.id)])
        return (
            <View style={styles.tableContainer}>
                <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                    <Row data={['Author', 'Views']} style={styles.tableHead} textStyle={styles.tableText} />
                    <Rows data={data} textStyle={styles.tableText} />
                </Table>
            </View>
        );
    }

    getLikesOfReference = id => {
        const ref = this.state.references.filter(ref => ref.id === id);
        return ref[0].likeBy.length;
    }

    getLikesOfAuthor = id => {
        const author = this.state.authors.filter(author => author.id === id);
        const refLikes = author[0].references.map(refId =>
            this.getLikesOfReference(refId)
        );
        return refLikes.length && refLikes.reduce((acc, val) => acc + val);
    }

    getLikesOfAuthors = () => {
        const data = this.state.authors.map(author => [author.fullName, this.getLikesOfAuthor(author.id)])
        return (
            <View style={styles.tableContainer}>
                <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                    <Row data={['Author', 'Likes']} style={styles.tableHead} textStyle={styles.tableText} />
                    <Rows data={data} textStyle={styles.tableText} />
                </Table>
            </View>
        );
    }

    getLikesOfReferences = () => {
        const data = this.state.references.map(ref => [ref.title, this.getLikesOfReference(ref.id)])
        return (
            <View style={styles.tableContainer}>
                <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                    <Row data={['Reference', 'Likes']} style={styles.tableHead} textStyle={styles.tableText} />
                    <Rows data={data} textStyle={styles.tableText} />
                </Table>
            </View>
        );
    }

    render() {
        const {
            loading,
        } = this.state;

        return (
            <>
                {loading ? <LoadingScreen /> :
                    <ScrollView >
                        <Text style={styles.text}>Number of Authors : {this.state.authors.length}</Text>
                        <Text style={styles.text}>    Number of References: {this.state.references.length} </Text>
                        <Text style={styles.tableTitle}>Authors Rating </Text>
                        {this.getRatingOfAuthors()}
                        <Text style={styles.tableTitle}>Authors Views </Text>
                        {this.getViewsOfAuthors()}
                        <Text style={styles.tableTitle}>Authors Likes </Text>
                        {this.getLikesOfAuthors()}
                        <Text style={styles.tableTitle}> References Likes </Text>
                        {this.getLikesOfReferences()}
                    </ScrollView>
                }
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
        backgroundColor: 'white',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
});