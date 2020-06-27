import React, { Component } from 'react';
import { Text, View, StyleSheet, PermissionsAndroid } from 'react-native';
import { Rating } from 'react-native-ratings';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import AsyncStorage from '@react-native-community/async-storage';

import firebase from '@react-native-firebase/app';
import '@react-native-firebase/storage';
import '@react-native-firebase/firestore';

import Form from '../../components/Form';
import Button from '../../components/Button';
import Menu from '../../components/Menu';
import AddQuote from './AddQuote';


export default class AddReference extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            rating: 0.0,
            addQuote: false,
            quotes: [],
            views: 0,
            fileName: '',
            fileURI: '',
            saving: false,
        }
    }

    save = async () => {
        this.setState({ saving: true });

        const {
            title,
            rating,
            quotes,
            views,
            fileName,
            fileURI,
        } = this.state;

        if (title === '' ||
            quotes === [] ||
            fileName === '') {
            alert('Please Fill all the fields');
            return;
        }

        const docName = title + '-' + fileName;
        const fileRef = firebase.storage().ref(docName);
        await fileRef.putFile(fileURI);

        AsyncStorage.getItem('loginDetails').then(userDetailStr => {
            const userDetails = JSON.parse(userDetailStr);
            firebase.firestore().collection('References').add({
                authorId: userDetails.id,
                title,
                rating,
                documentName: docName,
                views,
                quotes,
            });
        });

        this.setState({ title: '', quotes: [], fileName: '', fileURI: '', rating: 0, saving: false });

    }

    uploadReference = async () => {
        try {
            const filePermission = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            );
            if (filePermission === PermissionsAndroid.RESULTS.GRANTED) {
                const res = await DocumentPicker.pick({
                    type: [DocumentPicker.types.allFiles],
                });
                const stat = await RNFetchBlob.fs.stat(res.uri);
                this.setState({ fileName: res.name, fileURI: stat.path });
            }
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
            } else {
                alert(err);
            }
        }
    }

    addQuote = val => {
        this.setState({ quotes: [...this.state.quotes, val], addQuote: false })
    }

    render() {
        return (
            <>
                <Menu navigation={this.props.navigation} />
                {this.state.addQuote ?
                    (<AddQuote onAddQuote={this.addQuote} />)
                    : (<View style={styles.container}>
                        <Form
                            placeholder='Reference Title'
                            onUpdate={val => this.setState({ title: val })}
                            value={this.state.title}
                        />
                        <Rating
                            imageSize={30}
                            showRating
                            fractions={1}
                            startingValue={this.state.rating}
                            onFinishRating={val => this.setState({ rating: val })}
                        />
                        <Button onPress={this.uploadReference} text='Upload Reference' />
                        <Button onPress={() => this.setState({ addQuote: true })} text='Add A Quote' />
                        <Button onPress={this.save} text='Submit' />
                    </View>
                    )}
            </>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
})