import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, PermissionsAndroid } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import AsyncStorage from '@react-native-community/async-storage';
import Icons from "react-native-vector-icons/MaterialIcons"
import Spinner from 'react-native-loading-spinner-overlay';

import firebase from '@react-native-firebase/app';
import '@react-native-firebase/storage';
import '@react-native-firebase/firestore';

import Form from '../../components/Form';
import Textarea from '../../components/Textarea';
import Button from '../../components/Button';
import Menu from '../../components/Menu';
import AddQuote from './AddQuote';


export default class AddReference extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: '',
            saving: false,
            addQuote: false,

            title: '',
            referenceSummary: '',
            fileName: '',
            fileURI: '',
            imagesNameURI: {},
            quotes: [],

        }
    }

    save = async () => {
        if (this.state.saving)
            return;
        try {
            this.setState({ saving: true });

            const {
                userID,

                title,
                referenceSummary,
                fileName,
                fileURI,
                imagesNameURI,
                quotes,
            } = this.state;

            if (title === '' ||
                referenceSummary === '' ||
                quotes === [] ||
                fileName === '' ||
                Object.keys(imagesNameURI).length === 0) {
                alert('Please Fill all the fields');
                return;
            }



            let docName = title + '/' + userID + '-' + fileName;
            let fileRef = firebase.storage().ref(docName);
            const promises = [];
            promises.push(fileRef.putFile(fileURI));

            Object.keys(imagesNameURI).forEach(key => {
                docName = title + '/' + userID + '-' + key;
                let fileRef = firebase.storage().ref(docName);
                promises.push(fileRef.putFile(imagesNameURI[key]));
            });
            await Promise.all(promises);
            let loginDetails = await AsyncStorage.getItem('loginDetails');
            loginDetails = JSON.parse(loginDetails);
            const refAdded = await firebase.firestore().collection('References').add({
                authorDetails: loginDetails,
                summary: referenceSummary,
                title,
                rating: {},
                views: [],
                likeBy: [],
                documentName: title + '/' + userID + '-' + fileName,
                imagesNames: this.formatImagesName(),
                quotes,
            });

            firebase.firestore().collection('Users').doc(loginDetails.docID).update({
                references: loginDetails.references ? [...loginDetails.references, refAdded.id] : [refAdded.id],
            });

            AsyncStorage.setItem('loginDetails', JSON.stringify({
                ...loginDetails,
                references: loginDetails.references ? [...loginDetails.references, refAdded.id] : [refAdded.id]
            }));

            this.setState({
                title: '',
                imagesNameURI: {},
                referenceSummary: '',
                quotes: [],
                fileName: '',
                fileURI: '',
                saving: false
            });
        }
        catch (err) {
            alert(err);
        }
    }

    formatImagesName = () => {
        const { title, userID } = this.state;
        return Object.keys(this.state.imagesNameURI).map(val => {
            return title + '/' + userID + '-' + val;
        });
    }

    uploadPicture = async () => {
        try {
            const filePermission = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            );
            if (filePermission === PermissionsAndroid.RESULTS.GRANTED) {
                const results = await DocumentPicker.pickMultiple({
                    type: [DocumentPicker.types.images],
                });

                const imagesNameURI = {};
                for (const res of results) {
                    await RNFetchBlob.fs.stat(res.uri).then(stat => {
                        imagesNameURI[res.name] = stat.path;
                    });
                };

                this.setState({ imagesNameURI });
            }
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
            } else {
                alert(err);
            }
        }
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

    addQuote = (quoteId, clearState) => {
        this.setState({ quotes: [...this.state.quotes, quoteId] }, clearState)
    }

    goBack = () => {
        this.setState({ addQuote: false });
    }

    getImagesNamesJSX = () => {
        return Object.keys(this.state.imagesNameURI).map((val, index) => {
            return (<Text key={index}> {val} </Text>);
        });
    }

    render() {
        return (
            <>
                <Menu navigation={this.props.navigation} />
                <Spinner
                    visible={this.state.saving}
                    textContent={'Saving...'}
                    textStyle={styles.spinnerTextStyle}
                />
                {this.state.addQuote ?
                    (<AddQuote onAddQuote={this.addQuote} goBack={this.goBack} />)
                    : (<View style={styles.container}>
                        <Form
                            placeholder='Reference Title'
                            onUpdate={val => this.setState({ title: val })}
                            value={this.state.title}
                        />
                        <Textarea
                            placeholder='Reference Detail'
                            value={this.state.referenceSummary}
                            onUpdate={val => this.setState({ referenceSummary: val })}
                        />

                        <View style={styles.row}>
                            <Icons
                                name="attach-file"
                                size={20}
                                style={{ marginRight: 10 }}
                                onPress={this.uploadReference}
                            />
                            <Text style={{ fontSize: 16 }}>
                                {this.state.fileName === '' ? 'Attach a Reference File' : this.state.fileName}
                            </Text>
                            {this.state.fileName !== '' &&
                                <Icons name='clear' style={{ marginRight: 10 }}
                                    size={20}
                                    onPress={() => this.setState({ fileName: '', fileURI: '' })} />}
                        </View>
                        <Icons name='collections' size={20} onPress={this.uploadPicture} />
                        {Object.keys(this.state.imagesNameURI).length === 0 ?
                            (<Text> Add Pictures </Text>) :
                            this.getImagesNamesJSX()
                        }
                        <View>
                            <Button style={{ backgroundColor: '#08B4C5', }} onPress={() => this.setState({ addQuote: true })} text='Add A Quote' />
                            <Button style={{ backgroundColor: '#ffffff', }} onPress={this.save} text='Submit' />
                        </View>
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
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginVertical: 10
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
})