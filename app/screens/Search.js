import React from 'react';
import { SearchBar } from 'react-native-elements';
import { Text, ScrollView, StyleSheet } from 'react-native';
import { colors, fontSizes } from '../BaseStyles';
import ReferenceTile from '../components/ReferenceTile';

import firebase from '@react-native-firebase/app';
import '@react-native-firebase/storage';
import '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';
import { Dropdown } from 'react-native-material-dropdown';
import LoadingScreen from '../components/LoadingScreen';


export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            search: '',
            References: [],
            userID: '',
            filterBy: '',
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
                    likeBy: reference.likeBy,
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
            this.setState({ References: ReferenceTileProps, userID: loginDetails.docID, loading: false });
        }
        catch (err) {
            this.setState({ loading: false });
            alert(err);
        }
    }

    updateSearch = (search) => {
        this.setState({ search });
    };

    render() {
        const { References, search, userID, filterBy } = this.state;
        const lowerCaseSearch = search.toLowerCase();
        const filteredReferences = References.filter(ref => {
            if (filterBy === 'Author') {
                return ref.authorName.toLowerCase().includes(lowerCaseSearch);
            } else if (filterBy === 'Reference') {
                return ref.title.toLowerCase().includes(lowerCaseSearch);
            } else if (filterBy === 'Quote') {
                const quotes = ref.quotes.filter(quote =>
                    quote.quoteIdea.toLowerCase().includes(lowerCaseSearch)
                );
                return quotes.length > 0;
            } else {
                return ref;
            }
        })

        return (
            <ScrollView style={styles.container}>
                <SearchBar
                    placeholder="Search"
                    onChangeText={this.updateSearch}
                    value={search}
                    fontColor={colors.inputText}
                    lightTheme
                    containerStyle={{
                        backgroundColor: '#F2F3F4',
                        padding: 0,
                        width: '90%',
                        margin: 20,
                    }}
                />
                <Dropdown
                    containerStyle={styles.dropdownStyle}
                    pickerStyle={styles.pickerStyle}
                    label='Search By'
                    data={[{ value: 'Author' }, { value: 'Reference' }, { value: 'Quote' }]}
                    onChangeText={value => this.setState({ filterBy: value })}
                />

                {References.length
                    ? (filteredReferences.map((ref, index) =>
                        <ReferenceTile key={index} {...ref} userID={userID} />))
                    : (<LoadingScreen />)}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        paddingTop: 10,
    },
    searchbox: {
        fontSize: fontSizes.normal,
        fontWeight: '300',
        width: '100%',
        borderRadius: 8,
        marginTop: 20,
        marginHorizontal: 20,
    },
    dropdownStyle: {
        width: '90%',
        backgroundColor: 'white',
        marginBottom: 20,
        marginHorizontal: 20,
        fontSize: 30,
        fontWeight: 'bold',
    },
    pickerStyle: {
        width: 390,
        borderRadius: 25,
        backgroundColor: 'white',
        paddingHorizontal: 16,
        marginVertical: 10,
        fontSize: 30,
        fontWeight: 'bold',
    },
});