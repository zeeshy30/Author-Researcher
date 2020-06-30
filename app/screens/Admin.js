import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { registerCustomIconType } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';


import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';

import { fontSizes, colors } from '../BaseStyles';

export default class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            references: [],
            quotes: [],
            authors: [],
            showAuthorRatings: false,
            showAuthorViews: false,
            showAuthorLikes: false,
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
            alert(err);
        }
    }

    getRatingOfReference = id => {
        const ref = this.state.references.filter(ref => ref.id === id);
        const values = Object.values(ref[0].rating);
        return values.length === 0
            ? 0 :
            values.reduce((acc, val) => acc + val) / values.length;
    }

    getRatingOfAuthor = id => {
        const author = this.state.authors.filter(author => author.id === id);

        const refRatings = author[0].references.map(refId =>
            this.getRatingOfReference(refId)
        );
        return refRatings.reduce((acc, refRating) => acc + refRating) / refRatings.length;
    }

    getRatingOfAuthors = () => {
        return this.state.authors.map(author =>
            <Text style={styles.text}> {author.fullName} : {this.getRatingOfAuthor(author.id)}</Text>
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
        return refViews.reduce((acc, val) => acc + val);
    }

    getViewsOfAuthors = () => {
        return this.state.authors.map(author =>
            <Text style={styles.text}> {author.fullName} : {this.getViewsOfAuthor(author.id)}</Text>
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
        return refLikes.reduce((acc, val) => acc + val);
    }

    getLikesOfAuthors = () => {
        return this.state.authors.map(author =>
            <Text style={styles.text}> {author.fullName} : {this.getLikesOfAuthor(author.id)}</Text>
        );
    }

    render() {
        const { showAuthorRatings, showAuthorViews, showAuthorLikes } = this.state;
        return (
            <>
                <View >
                    <Text style={styles.text}>Number of Authors : {this.state.authors.length}</Text>
                    <Text style={styles.text}>    Number of References: {this.state.references.length} </Text>
                    <TouchableOpacity
                        style={styles.dropdownStyle}
                        onPress={() => this.setState({ showAuthorRatings: !showAuthorRatings, showAuthorViews: false, showAuthorLikes: false })}
                    >
                        <Text style={{ fontSize: fontSizes.large }}>{
                            showAuthorRatings ? 'Hide' : 'Show'} Authors Rating <Icon name='down' size={20} />
                        </Text>
                        {showAuthorRatings && this.getRatingOfAuthors()}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.dropdownStyle}
                        onPress={() => this.setState({ showAuthorViews: !showAuthorViews, showAuthorRatings: false, showAuthorLikes: false })}
                    >
                        <Text style={{ fontSize: fontSizes.large }}>{
                            showAuthorViews ? 'Hide' : 'Show'} Authors Views <Icon name='down' size={20} />
                        </Text>
                        {showAuthorViews && this.getViewsOfAuthors()}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.dropdownStyle}
                        onPress={() => this.setState({ showAuthorLikes: !showAuthorLikes, showAuthorRatings: false, showAuthorViews: false })}
                    >
                        <Text style={{ fontSize: fontSizes.large }}>{
                            showAuthorLikes ? 'Hide' : 'Show'} Authors Likes <Icon name='down' size={20} />
                        </Text>
                        {showAuthorLikes && this.getLikesOfAuthors()}
                    </TouchableOpacity>
                </View>
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
        backgroundColor: 'green',
        marginTop: 10,
        fontSize: fontSizes.large,
    },
});