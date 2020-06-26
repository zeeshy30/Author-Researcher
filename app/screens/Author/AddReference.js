import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Rating } from 'react-native-ratings';
import DocumentPicker from 'react-native-document-picker';

import Form from '../../components/Form';
import Button from '../../components/Button';
import Menu from '../../components/Menu';
import AddQuote from './AddQuote';
import firebase from 'react-native-firebase';


export default class AddReference extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            rating: 0.0,
            addQuote: false,
            quotes: [],
            views: 0,
        }
    }

    /* TODO: add this functionality */
    uploadReference = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            const fileRef = firebase.storage().ref(res.name);
            const result = await fileRef.putFile(decodeURI(res.uri));
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
            } else {
                throw err;
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
                        <Button onPress={this.submit} text='Submit' />
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