import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors, fontSizes } from '../BaseStyles';

export default Button = props => {
    return (
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText} onPress={props.onPress}>{props.text}</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    button: {
        width: 300,
        backgroundColor: '#08B4C5',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 12
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center'
    }
});