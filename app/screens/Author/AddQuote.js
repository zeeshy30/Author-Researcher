import React, { Component } from 'react'
import {
    StyleSheet,
    View, Text
} from 'react-native';
import NumericInput from '@wwdrew/react-native-numeric-textinput';
import Spinner from 'react-native-loading-spinner-overlay';

import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';


import Textarea from '../../components/Textarea';
import { colors, fontSizes } from '../../BaseStyles';


export default class AddQuote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            processing: false,
            quoteIdea: '',
            quotation: '',
            price: '',
            bookPage: '',
        }
    }
    setQuotation = val => {
        this.setState({ quotation: val });
    }

    setQuoteIdea = val => {
        this.setState({ quoteIdea: val });
    }

    setPrice = val => {
        this.setState({ price: val });
    }

    setBookPage = val => {
        this.setState({ bookPage: val });
    }

    save = () => {
        const { quoteIdea, quotation, price, bookPage } = this.state;
        if (quoteIdea === '' || quotation === '' || price === '' || bookPage === '') {
            alert('Please fill all fields');
            return;
        }
        this.setState({ processing: true });
        firebase.firestore().collection('Quotes').add({
            ...this.state,
            rating: {},
            likedBy: [],
        }).then(doc => {
            this.props.onAddQuote(doc.id, this.clearState);
        }).catch(err => {
            this.setState({ processing: false });
            alert(err);
        });
    }

    clearState = () => {
        this.setState({
            quoteIdea: '',
            quotation: '',
            price: '',
            bookPage: '',
            processing: false
        });
    }

    render() {
        return (
            <View style={styles.inputContainer}>
                <Spinner
                    visible={this.state.processing}
                    textContent={'Saving...'}
                    textStyle={styles.spinnerTextStyle}
                />
                <Textarea
                    placeholder="Quote"
                    value={this.state.quotation}
                    onUpdate={this.setQuotation} />
                <Textarea
                    placeholder="Idea of Quote"
                    value={this.state.quoteIdea}
                    onUpdate={this.setQuoteIdea} />
                <View style={styles.numericContent}>
                    <NumericInput
                        style={styles.numericInput}
                        type='currency'
                        locale='en-US'
                        currency='USD'
                        placeholder='Price'
                        value={this.state.price}
                        onUpdate={this.setPrice} />
                    <NumericInput
                        style={styles.numericInput}
                        placeholder="Page Number"
                        value={this.state.bookPage}
                        onUpdate={this.setBookPage} />
                </View>
                <Text>{'\n'}</Text>
                <Button onPress={this.save} text='Add' />
                <Button onPress={this.props.goBack} text='Back' />

            </View>
        )
    }
}


const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    numericContent: {
        marginVertical: 10,
        width: 300,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    numericInput: {
        borderRadius: 25,
        paddingHorizontal: 16,
        backgroundColor: '#eeeeee',
        width: 130,
        height: 60,
        fontSize: fontSizes.normal,
        color: colors.inputText,
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
});
