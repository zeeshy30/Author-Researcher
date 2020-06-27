import React, { Component } from 'react'
import {
    StyleSheet,
    View, Text
} from 'react-native';
import NumericInput from '@wwdrew/react-native-numeric-textinput';

import Textarea from '../../components/Textarea';
import { colors, fontSizes } from '../../BaseStyles';


export default class AddQuote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Style: '',
            Quotation: '',
            Price: '',
            Booknumber: '',
        }
    }
    setQuotation = val => {
        this.setState({ Quotation: val });
    }

    setStyle = val => {
        this.setState({ Style: val });
    }

    setPrice = val => {
        this.setState({ Price: val });
    }

    setBooknumber = val => {
        this.setState({ Booknumber: val });
    }

    save = () => {
        this.props.onAddQuote({ ...this.state });
    }

    render() {
        return (
            <View style={styles.inputContainer}>
                <Text>{'\n'}</Text>
                <Textarea
                    placeholder="Your Quotation"
                    value={this.state.Quotation}
                    onUpdate={this.setQuotation} />
                <Textarea
                    placeholder="Your Style"
                    value={this.state.Style}
                    onUpdate={this.setStyle} />
                <View style={styles.numericContent}>
                    <NumericInput
                        style={styles.numericInput}
                        type='currency'
                        locale='ja-JP'
                        currency='JPY'
                        placeholder= 'Price'
                        value={this.state.Price}
                        onUpdate={this.setPrice} />
                    <NumericInput
                        style={styles.numericInput}
                        placeholder="Book Number"
                        value={this.state.Booknumber}
                        onUpdate={this.setBooknumber} />
                </View>
                <Text>{'\n'}</Text>
                <Button onPress={this.save} text='Add' />

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
        flex: 1,
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
    }
});
