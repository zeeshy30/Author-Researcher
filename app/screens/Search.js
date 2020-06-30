import React from 'react';
import { SearchBar } from 'react-native-elements';
import { Text, ScrollView, StyleSheet, Image } from 'react-native';
import { colors, fontSizes } from '../BaseStyles';
import ReferenceTile from '../components/ReferenceTile';
import QuoteTile from '../components/QuoteTile';

import firebase from '@react-native-firebase/app';
import '@react-native-firebase/storage';
import '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';


export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            References: [],
            userID: '',
        }
    }

    componentDidMount() {
        this.fetchReferences();
    }

    fetchReferences = async () => {
        try {
            const loginDetailsPromise = AsyncStorage.getItem('loginDetails');
            const referencesRef = firebase.firestore().collection('References');
            const refSnapshots = await referencesRef.get();
            let References = [];
            refSnapshots.forEach(doc => {
                const reference = doc.data();
                reference.docID = doc.id;
                References.push(reference)
            });
            const quotePromise = firebase.firestore().collection('Quotes').get();

            for (const reference in References) {
                const urls = [];
                for (imageName in References[reference].imagesNames) {
                    const url = await firebase.storage()
                        .ref(References[reference].imagesNames[imageName])
                        .getDownloadURL();
                    urls.push(url);
                }
                References[reference].imagesURL = urls;
            }

            const quotesSnapshots = await quotePromise;

            const quotes = {};
            quotesSnapshots.forEach(quoteSnap => {
                const data = quoteSnap.data();
                data.id = quoteSnap.id;
                quotes[quoteSnap.id] = data;
            });

            const ReferenceTileProps = References.map(reference => {
                return {
                    id: reference.docID,
                    title: reference.title,
                    summary: reference.summary,
                    rating: reference.rating,
                    views: reference.views,
                    images: reference.imagesURL,
                    authorID: reference.authorDetails.docID,
                    authorName: reference.authorDetails.fullName,
                    authorBio: reference.authorDetails.bio,
                    authorEmail: reference.authorDetails.email,
                    quotes: reference.quotes.map(quoteid => {
                        return quotes[quoteid]
                    }),
                }
            });
            let loginDetails = await loginDetailsPromise;
            loginDetails = JSON.parse(loginDetails);
            this.setState({ References: ReferenceTileProps, userID: loginDetails.docID });
        }
        catch (err) {
            alert(err);
        }
    }

    updateSearch = (search) => {
        this.setState({ search });
    };

    render() {
        const { References, search, userID } = this.state;

        return (
            <ScrollView style={styles.container}>
                <SearchBar
                    placeholder="Search"
                    onChangeText={this.updateSearch}
                    value={search}
                    fontColor={colors.inputText}
                    lightTheme
                    containerStyle={{
                        backgroundColor: 'white',
                        padding: 0,
                        width: '90%',
                        margin: 20,
                    }}

                />
                {References.length
                    ? (References.map((ref, index) =>
                        <ReferenceTile key={index} {...ref} userID={userID} />))
                    : (<Text> loading...</Text>)}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'flex-start',
        paddingTop: 10,
    },
    searchbox: {

        fontSize: fontSizes.normal,
        fontWeight: '300',
        width: '100%',
        borderRadius: 8,
        margin: 20
    }
});